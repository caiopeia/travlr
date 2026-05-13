import { create, StoreApi, UseBoundStore } from 'zustand';
import axios from 'axios';

const BASE_URL = 'http://localhost/api';

// fixme - type is declared twice
export type Trip = {
  id: number | null;
  name: string;
  description: string;
};

export type State = {
  trip: Trip | null,
}

export type Action = {
  fetch: (id: number) => Promise<void>,
  update: (trip: Trip) => Promise<void>,
  setDescription: (description: string) => void,
}

export const useTripStore = create<State & Action>((set, get) => ({
    trip: null,
    fetch: async (id: number) => {
        try {
        const response = await axios.get(`${BASE_URL}/trips/${id}`);
        const trip: Trip = response.data;
        set((state) => ({ 
            trip: trip,
        }));
        } catch (error) {
        console.error('Failed to fetch trips:', error);
        }
    },
    update: async (trip: Trip) => {
        try {      
        await axios.put(`${BASE_URL}/trips/${trip.id}`, trip);
        } catch (error) {
        console.error('Failed to update trip:', error);
        }
    },
    setDescription: (description: string) => {
        set((state) => ({
        trip: state.trip ? { ...state.trip, description } : null,
        }));
    },
}));
