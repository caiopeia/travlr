import { create } from 'zustand';
import axios from 'axios';
import { Trip } from './trip_store';

const BASE_URL = 'http://localhost/api';

export type State = {
  trips: Trip[],
  current: number | null,
}

export type Action = {
  fetch: () => Promise<void>,
  create: () => Promise<void>,
  deleteTrip: (id: number) => Promise<void>,
  toggleCurrent: (id: number) => void,
}

export const useTrips = create<State & Action>((set, get) => ({
  trips: [],
  current: null,
  fetch: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/trips`);
      const trips: Trip[] = response.data;
      set((state) => ({ 
        trips: trips, 
        current: state.current,
      }));
    } catch (error) {
      console.error('Failed to fetch trips:', error);
    }
  },
  create: async () => {
    const newTrip = {
      id: null,
      name: `My exciting trip.`,
      description: 'Created from UI button',
    };
    try {      
      await axios.post(`${BASE_URL}/trips`, newTrip);
      await get().fetch();
    } catch (error) {
      console.error('Failed to create trip:', error);
    }
  },
  deleteTrip: async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/trips/${id}`);
      await get().fetch();
    } catch (error) {
      console.error('Failed to delete trip:', error);
    }
  },
  toggleCurrent: (id: number) => set((state) => ({
    current: state.current === id ? null : id,
  })),
}));