/**
 * - client side DTO model
 * - only simple getters and setters, adds and removes
 * - no (complex) business logic
 */
import { create } from 'zustand';

export type Trip = {
  id: number | null;  // FIXME if we can make this non-nullable, we can remove a lot of null checks in the code
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
