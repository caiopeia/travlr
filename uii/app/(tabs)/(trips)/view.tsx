import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native';
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
  fetch: () => Promise<void>,
  create: () => Promise<void>,
}

export const useTrip = create<State & Action>((set, get) => ({
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
}));

export default function Trips() {
  const { trips, fetch, create } = useTrip();
  useEffect(() => {
    fetch();
  }, [fetch]);

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
      <Pressable style={styles.createButton} onPress={create}>
        <Text style={styles.createButtonText}>Create Trip</Text>
      </Pressable>
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
  createButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
