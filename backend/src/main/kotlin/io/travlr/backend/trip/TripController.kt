package io.travlr.backend.trip

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun post(
        @RequestBody trip: Trip,
    ): Mono<Trip> = tripRepository.save(trip.copy(id = null))
}
