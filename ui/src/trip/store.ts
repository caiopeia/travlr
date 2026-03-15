import { create } from 'zustand';

export type State = {
  trips: Trip[],
}

export type Trip = {
  id: number,
  name: string,
  description: string,
}

export const store = create<State>(() => ({
  trips: [],
}));

export const setTrips = (trips: Trip[]) => store.setState({ 
  trips: trips,
});
