/**
 * - backend access
 * - business logic
 */

import axios from 'axios';
import { Trip, setTrips, setCurrent } from './store.ts';

const BASE_URL = 'http://localhost/api';

export const getAll = async () => {
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
    await getAll();
  } catch (error) {
    console.error('Failed to delete trip:', error);
  }
};

export const create = async (trip: Trip) => {
  try {
    await axios.post(`${BASE_URL}/trips`, trip);
    await getAll();
  } catch (error) {
    console.error('Failed to create trip:', error);
  }
};

export const toggleCurrent = (id: number) => {
  setCurrent(state => state.current === id ? null : id);
};
