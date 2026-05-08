import { Text, View, StyleSheet, FlatList } from 'react-native';
import { create } from 'zustand';
import axios from 'axios';
import { useEffect } from 'react';

const BASE_URL = 'http://localhost/api';

export type Trip = {
  id: number | null;
  name: string;
  description: string;
};

export type State = {
  trips: Trip[],
  current: number | null,
}

type Action = {
  fetchTrips: () => Promise<void>;
}

export const useTrip = create<State & Action>((set) => ({
  trips: [],
  current: null,
  fetchTrips: async () => {
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
}));

export default function Trips() {
  const { trips, fetchTrips } = useTrip();
  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return (
    <View style={styles.container}>
      <FlatList data={trips}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item: trip }) => {
          return (
            <Text style={styles.text}>{trip.name}</Text>
          );
        }}
      />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    marginBottom: 16,
  },
});
