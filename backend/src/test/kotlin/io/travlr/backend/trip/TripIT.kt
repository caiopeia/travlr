package io.travlr.backend.trip

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
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
class TripIT(
    @Autowired val tripRepository: TripRepository,
    @Autowired val webTestClient: WebTestClient,
) {
    @BeforeEach
    fun beforeEach() {
        tripRepository.deleteAll()
    }

    @Test
    fun `get all`() {
        val result: FluxExchangeResult<Trip> = webTestClient.get()
            .uri("/api/trips")
            .exchange()
            .expectStatus().isOk()
            .returnResult(Trip::class.java)

        // A (assertj)
        val trips: List<Trip> = result.responseBody.toStream().toList()
        assertThat(trips).hasSize(1)
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

    companion object {

        @Container
        @JvmStatic
        private val postgres = PostgreSQLContainer("postgres:18.1-alpine")

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
    }
}