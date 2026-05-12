import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native';
import { create } from 'zustand';
import axios from 'axios';
import { useCallback } from 'react';
import { Link, useFocusEffect } from 'expo-router';

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
  deleteTrip: (id: number) => Promise<void>,
  toggleCurrent: (id: number) => void,
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
  deleteTrip: async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/trips/${id}`);
      await get().fetch();
    } catch (error) {
      console.error('Failed to delete trip:', error);
    }
  },
  toggleCurrent: (id: number) => set((state) => ({
    current: state.current === id ? null : id,
  })),
}));

export default function Trips() {
  const { trips, current, fetch, create, deleteTrip, toggleCurrent } = useTrip();
  useFocusEffect(
    useCallback(() => {
      fetch();
    }, [fetch])
  );

  return (
    <View style={styles.container}>
      <FlatList data={trips}
        style={{ width: '100%' }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          const expanded = current === item.id;
          return (
            <View style={styles.itemContainer}>
              <Pressable onPress={() => toggleCurrent(item.id!!)} style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{item.id} - {item.name}</Text>
                <Text style={styles.expandHint}>{expanded ? '▲' : '▼'}</Text>
              </Pressable>
              {expanded && (
                <View style={styles.text}>
                  <Text style={styles.text}>{item.description}</Text>
                  <Link href={{ pathname: "/trip", params: { id: item.id } }} style={styles.button}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </Link>
                  <Pressable onPress={() => deleteTrip(item.id!!)} style={styles.button}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </Pressable>
                </View>
              )}
            </View>
          );
        }}
      />
      <Pressable style={styles.button} onPress={create}>
        <Text style={styles.buttonText}>Create Trip</Text>
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
  button: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  expandHint: {
    fontSize: 14,
    color: '#fff',
  },
});
