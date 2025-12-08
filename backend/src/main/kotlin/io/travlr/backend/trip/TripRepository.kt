package io.travlr.backend.trip

import org.springframework.data.repository.reactive.ReactiveCrudRepository

interface TripRepository : ReactiveCrudRepository<Trip, Long>