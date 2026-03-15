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