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

type Action = {
  // FIXME Te actions are so far used as service functions, but they are really just setters. 
  // We should move them to the TripStore and rename them to setX, addX, removeX etc. 
  // Then we can have the service functions in the TripService.ts file that call these setters 
  // and also contain any business logic if needed.
  setDescription: (description: Trip['description']) => void,
}

export const store = create<State & Action>(() => ({
  trip: null,
  setDescription: (description) => store.setState((state) => ({
    trip: state.trip ? { ...state.trip, description } : null,
  })),
}));

export const setTrip = (
  trip: Trip,
) => store.setState({ 
  trip: trip,
});
