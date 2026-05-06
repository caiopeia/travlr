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
  trip: Trip | null,
}

export const store = create<State>(() => ({
  trip: null,
}));

export const setDescription = (
  description: Trip['description']
) => store.setState((state) => ({
  trip: state.trip ? { ...state.trip, description } : null,
}));

export const setTrip = (
  trip: Trip,
) => store.setState({ 
  trip: trip,
});
