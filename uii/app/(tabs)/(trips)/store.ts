/**
 * - client side DTO model
 * - only simple getters and setters, adds and removes
 * - no (complex) business logic or side effects
 */
import { create } from 'zustand';

export type Trip = {
  id: number | null;
  name: string;
  description: string;
};

export type State = {
  trips: Trip[],
  current: number | null,
}

export const store = create<State>(() => ({
  trips: [],
  current: null,
}));

export const setTrips = (
  trips: Trip[],
) => store.setState({ 
  trips: trips,
});

export const addTrip = (
  trip: Trip,
) => store.setState((state) => ({
  trips: [...state.trips, trip],
}));

export const setCurrent = (
  current: (state: State) => number | null,
) => store.setState(
  (state) => ({ current: current(state) }),
);
