package io.travlr.backend.trip

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.Profile
import org.springframework.test.context.DynamicPropertyRegistry
import org.springframework.test.context.DynamicPropertySource
import org.springframework.test.web.reactive.server.FluxExchangeResult
import org.springframework.test.web.reactive.server.WebTestClient
import org.testcontainers.containers.PostgreSQLContainer
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers


@Testcontainers
@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
)
@Profile("local")
class TripIT(
    @Autowired val webTestClient: WebTestClient,
    @Autowired val tripRepository: TripRepository,
) {
    @BeforeEach
    fun beforeEach() {
        tripRepository.deleteAll().block()
    }

    @Test
    fun `get all`() {
        val cut: Trip = tripRepository.save(
            Trip(
                name = "Central America",
                description = "My trip to Central America",
            )
        ).block()!!

        val result: FluxExchangeResult<Trip> = webTestClient.get()
            .uri("/api/trips")
            .exchange()
            .expectStatus().isOk
            .returnResult(Trip::class.java)

        // A (assertj)
        val trips: List<Trip> = result.responseBody.toStream().toList()
        assertThat(trips).hasSize(1)
        assertThat(trips[0]).isEqualTo(cut)

        // B (io.reactor) - can only have one
//        StepVerifier.create(result.responseBody)
//            .expectNextMatches({ t -> t.name.equals(cut.name)
//                    && t.description.equals(cut.description) })
//            .expectNextCount(0)
//            .thenCancel()
//            .verify()
    }

    @Test
    fun `get`() {
        val cut: Trip = tripRepository.save(
            Trip(
                name = "Central America",
                description = "My trip to Central America",
            )
        ).block()!!

        val trip: Trip = webTestClient.get()
            .uri("/api/trips/{id}", cut.id)
            .exchange()
            .expectStatus().isOk()
            .returnResult(Trip::class.java)
            .responseBody.single().block()!!

        assertThat(trip).isEqualTo(cut)
    }

    @Test
    fun `post`() {
        val new = Trip(
            name = "South America",
            description = "My trip to South America",
        )

        val result: Trip = webTestClient.post()
            .uri("/api/trips")
            .bodyValue(new)
            .exchange()
            .expectStatus().isOk
            .returnResult(Trip::class.java)
            .responseBody.single().block()!!

        assertThat(result.id).isNotNull
        assertThat(result.name).isEqualTo(new.name)
        assertThat(result.description).isEqualTo(new.description)
        val saved: Trip = tripRepository.findById(result.id!!).block()!!
        assertThat(saved).isEqualTo(result)
    }

    @Test
    fun `put`() {
        val existing: Trip = tripRepository.save(
            Trip(
                name = "Central America",
                description = "My trip to Central America",
            )
        ).block()!!
        val update = Trip(
            name = "West America",
            description = "My trip to West America",
        )

        val result: Trip = webTestClient.put()
            .uri("/api/trips/{id}", existing.id)
            .bodyValue(update)
            .exchange()
            .expectStatus().isOk
            .returnResult(Trip::class.java)
            .responseBody.single().block()!!

        assertThat(result.id).isEqualTo(existing.id)
        assertThat(result.name).isEqualTo(update.name)
        assertThat(result.description).isEqualTo(update.description)
    }

    @Test
    fun `delete`() {
        val cut: Trip = tripRepository.save(
            Trip(
                name = "Central America",
                description = "My trip to Central America",
            )
        ).block()!!

        val result = webTestClient.delete()
            .uri("/api/trips/{id}", cut.id)
            .exchange()
            .expectStatus().isOk
            .returnResult(Void::class.java)
            .responseBody

        assertThrows<NoSuchElementException>{
            result.then(tripRepository.findById(cut.id!!))
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