import axios from 'axios';
import { Trip, setTrips } from './store.ts';

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