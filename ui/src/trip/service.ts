import axios from 'axios';
import { Trip, setTrips, store } from './store.ts';

const BASE_URL = 'http://localhost/api';

export const getTrips = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trips`);
    const trips: Trip[] = response.data;
    setTrips(trips);
  } catch (error) {
    console.error('Failed to fetch trips:', error);
  }
};

export const deleteTrip = async (tripId: number) => {
  try {
    await axios.delete(`${BASE_URL}/trips/${tripId}`);
    await getTrips();
  } catch (error) {
    console.error('Failed to delete trip:', error);
  }
};

export type NewTrip = Omit<Trip, 'id'>;

export const createTrip = async (trip: NewTrip) => {
  try {
    await axios.post(`${BASE_URL}/trips`, trip);
    await getTrips();
  } catch (error) {
    console.error('Failed to create trip:', error);
  }
};

export const toggleExpanded = (tripId: number) => store.setState((state) => {
  const next = new Set(state.expandedIds);
  if (next.has(tripId)) next.delete(tripId);
  else next.add(tripId);
  return { expandedIds: next };
});
