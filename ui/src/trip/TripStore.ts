/**
 * - client side DTO model
 * - only simple getters and setters, adds and removes
 * - no (complex) business logic
 */
import { create } from 'zustand';

export type State = {
  trips: Trip[],
  current: number | null,
}

export type Trip = {
  id: number,
  name: string,
  description: string,
}

export const store = create<State>(() => ({
  trips: [],
  current: null,
}));

export const setTrips = (trips: Trip[]) => store.setState({ 
  trips: trips,
});

export const addTrip = (trip: Trip) => store.setState((state) => ({
  trips: [...state.trips, trip],
}));
