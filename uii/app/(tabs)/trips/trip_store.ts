import { create, StoreApi, UseBoundStore } from 'zustand';
import axios from 'axios';
import { BASE_URL } from '../../constants';

export type Trip = {
  id: number | null;
  name: string;
  description: string;
};

export type TripUpdate = {
  name?: string;
  description?: string;
};

export type State = {
  trip: Trip | null,
}

export type Action = {
  fetch: (id: number) => Promise<void>,
  patch: (id: number, update: TripUpdate) => Promise<void>,
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
    patch: async (id: number, update: TripUpdate) => {
        if (!id) return;
        try {
            await axios.patch(`${BASE_URL}/trips/${id}`, {
                name: update.name,
                description: update.description,
            });
        } catch (error) {
            console.error('Failed to patch trip:', error);
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
