package io.travlr.backend.trip

import org.springframework.data.annotation.Id
import java.util.Objects


data class Trip(
    @field:Id
    val id: Long? = null,
    val description: String,
    val name: String,
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || javaClass != other.javaClass) return false
        val otherTrip: Trip = other as Trip

        return otherTrip.id == id
                && otherTrip.name == name
                && otherTrip.description == description
    }

    override fun hashCode(): Int {
        return Objects.hash(name)
    }
}
