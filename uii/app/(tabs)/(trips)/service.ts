/**
 * - backend access
 * - business logic
 */

import axios from 'axios';
import { Trip } from './store';
import { setTrip } from './store';

const BASE_URL = 'http://localhost/api';

export const get = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/trips/${id}`);
    const trip: Trip = response.data;
    setTrip(trip);
  } catch (error) {
    console.error('Failed to fetch trips:', error);
  }
};

export const save = async (trip: Trip) => {
  try {
    if (trip.id) {
      await axios.put(`${BASE_URL}/trips/${trip.id}`, trip);
    } else {
      await axios.post(`${BASE_URL}/trips`, trip);
    }
    await get(trip.id!);
  } catch (error) {
    console.error('Failed to save trip:', error);
  }
};
