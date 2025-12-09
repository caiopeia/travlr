package io.travlr.backend.trip

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.DynamicPropertyRegistry
import org.springframework.test.context.DynamicPropertySource
import org.springframework.test.web.reactive.server.FluxExchangeResult
import org.springframework.test.web.reactive.server.WebTestClient
import org.testcontainers.containers.PostgreSQLContainer
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers


@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
)
@Testcontainers
@TestMethodOrder(MethodOrderer.OrderAnnotation::class)
class TripIT(
    @Autowired val webTestClient: WebTestClient,
    @Autowired val tripRepository: TripRepository,
) {
    @BeforeEach
    fun beforeEach() {
        tripRepository.deleteAll()
    }

    @Test
    @Order(1)
    fun `get all`() {
        val result: FluxExchangeResult<Trip> = webTestClient.get()
            .uri("/api/trips")
            .exchange()
            .expectStatus().isOk
            .returnResult(Trip::class.java)

        // A (assertj)
        val trips: List<Trip> = result.responseBody.toStream().toList()
        assertThat(trips).hasSize(1)
        assertThat(trips[0].id).isEqualTo(1)
        assertThat(trips[0].name).isEqualTo("Central America")
        assertThat(trips[0].description).isEqualTo("My trip to Central America")

        // B (io.reactor) - can only have one
//        StepVerifier.create(result.responseBody)
//            .expectNextMatches({ t -> t.name.equals("Central America")
//                    && t.description.equals("My trip to Central America") })
//            .expectNextCount(0)
//            .thenCancel()
//            .verify()
    }

    @Test
    @Order(2)
    fun `get`() {
        val result: FluxExchangeResult<Trip> = webTestClient.get()
            .uri("/api/trips/{id}", 1)
            .exchange()
            .expectStatus().isOk()
            .returnResult(Trip::class.java)

        val trip: Trip = result.responseBody
            .single()   // extract only first element and throw error if zero or more than one
            .block()!!  // end non blocking request and get result (throws exception on logs)
        assertThat(trip.id).isEqualTo(1)
        assertThat(trip.name).isEqualTo("Central America")
        assertThat(trip.description).isEqualTo("My trip to Central America")
    }

    @Test
    @Order(3)
    fun `post`() {
        val result: FluxExchangeResult<Trip> = webTestClient.post()
            .uri("/api/trips")
            .bodyValue(
                Trip(
                    name = "South America",
                    description = "My trip to South America",
                )
            )
            .exchange()
            .expectStatus().isOk
            .returnResult(Trip::class.java)

        val trip: Trip = result.responseBody
            .single()   // extract only first element and throw error if zero or more than one
            .block()!!  // end non blocking request and get result (throws exception on logs)
        assertThat(trip.id).isEqualTo(2)
        assertThat(trip.name).isEqualTo("South America")
        assertThat(trip.description).isEqualTo("My trip to South America")
    }

    @Test
    @Order(4)
    fun `put`() {
        val result: FluxExchangeResult<Trip> = webTestClient.put()
            .uri("/api/trips/{id}", 1)
            .bodyValue(
                Trip(
                    name = "West America",
                    description = "My trip to West America",
                )
            )
            .exchange()
            .expectStatus().isOk
            .returnResult(Trip::class.java)

        val trip: Trip = result.responseBody
            .single()   // extract only first element and throw error if zero or more than one
            .block()!!  // end non blocking request and get result (throws exception on logs)
        assertThat(trip.id).isEqualTo(1)
        assertThat(trip.name).isEqualTo("West America")
        assertThat(trip.description).isEqualTo("My trip to West America")
    }

    @Test
    @Order(5)
    fun `delete`() {
        assertThat(
            tripRepository.findById(1).single().blockOptional()
        ).isNotEmpty

        val result = webTestClient.delete()
            .uri("/api/trips/{id}", 1)
            .exchange()
            .expectStatus().isOk
            .returnResult(Void::class.java)
            .responseBody

        assertThrows<NoSuchElementException>{
            result.then(tripRepository.findById(1))
                .single()
                .block()
        }
    }

    companion object {

        @Container
        @JvmStatic
        private val postgres = PostgreSQLContainer("postgres:18.1-alpine")

        @JvmStatic
        @DynamicPropertySource
        fun registerDynamicProperties(registry: DynamicPropertyRegistry) {
            val r2dbcUrl = "r2dbc" + postgres.jdbcUrl.substring(
                postgres.jdbcUrl.indexOf(":")
            )
            registry.add("spring.r2dbc.url", { r2dbcUrl });
            registry.add("spring.r2dbc.username", postgres::getUsername);
            registry.add("spring.r2dbc.password", postgres::getPassword);
            registry.add("spring.liquibase.url", postgres::getJdbcUrl);
            registry.add("spring.liquibase.user", postgres::getUsername);
            registry.add("spring.liquibase.password", postgres::getPassword);
        }

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            postgres.start()
        }

        @AfterAll
        @JvmStatic
        fun afterAll() {
            postgres.stop()
        }
    }
}