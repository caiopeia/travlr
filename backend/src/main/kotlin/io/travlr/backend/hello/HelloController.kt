package io.travlr.backend.hello

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


@RestController
class HelloController {

    @GetMapping("/mono")
    fun getMono(): Mono<String?> {
        return Mono.just<String?>("Hello, Reactive World!")
    }

    @GetMapping("/flux")
    fun getFlux(): Flux<String?> {
        return Flux.just<String?>("Hello", "Reactive", "World")
    }
}