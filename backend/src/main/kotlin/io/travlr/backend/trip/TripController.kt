package io.travlr.backend.trip

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


@RestController
@RequestMapping(value = ["/api/trips"])
class TripController(
    val tripRepository: TripRepository,
) {
    @GetMapping
    fun getAll(): Flux<Trip> = tripRepository.findAll()

    @GetMapping("/{id}")
    fun get(
        @PathVariable id: Long,
    ): Mono<Trip> = tripRepository.findById(id)


}
