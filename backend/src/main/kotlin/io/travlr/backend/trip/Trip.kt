package io.travlr.backend.trip

import org.springframework.data.annotation.Id


data class Trip(
    @field:Id
    val id: Long? = null,
    val description: String,
    val name: String,
)
