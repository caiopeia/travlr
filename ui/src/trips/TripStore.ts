/**
 * - client side DTO model
 * - only simple getters and setters, adds and removes
 * - no (complex) business logic
 */
import { create } from 'zustand';
import { Trip } from './TripsStore';

export type State = {
  trip: Trip | null,
}

export const store = create<State>(() => ({
  trip: null,
}));

export const setTrip = (
  trip: Trip,
) => store.setState({ 
  trip: trip,
});
