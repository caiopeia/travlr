/**
 * - backend access
 * - business logic
 */

import axios from 'axios';
import { Trip } from './TripsStore.ts';
import { setTrip } from './TripStore.ts';

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
