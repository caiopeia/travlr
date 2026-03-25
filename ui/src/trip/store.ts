import { create } from 'zustand';

export type State = {
  trips: Trip[],
  isDeleting: boolean,
}

export type Trip = {
  id: number,
  name: string,
  description: string,
}

export const store = create<State>(() => ({
  trips: [],
  isDeleting: false,
}));

export const setTrips = (trips: Trip[]) => store.setState({ 
  trips: trips,
});

export const setIsDeleting = (isDeleting: boolean) => store.setState({
  isDeleting,
});

export const addTrip = (trip: Trip) => store.setState((state) => ({
  trips: [...state.trips, trip],
}));
