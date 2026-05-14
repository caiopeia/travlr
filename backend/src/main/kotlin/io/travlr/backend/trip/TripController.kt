package io.travlr.backend.trip

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
    fun post(
        @RequestBody trip: Trip,
    ): Mono<Trip> = tripRepository.save(trip.copy(id = null))

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody trip: Trip,
    ): Mono<Trip> = tripRepository.save(trip.copy(id = id))

    @PatchMapping("/{id}")
    fun patch(
        @PathVariable id: Long,
        @RequestBody patch: TripUpdate,
    ): Mono<Trip> = tripRepository.findById(id)
            .flatMap { trip ->
                tripRepository.save(trip.copy(
                    name = patch.name ?: trip.name,
                    description = patch.description ?: trip.description,
                ))
            }

    @DeleteMapping("/{id}")
    fun delete(
        @PathVariable id: Long,
    ): Mono<Void> = tripRepository.deleteById(id)   // do not silently ignore non existing ids
}
