/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { create } from 'zustand';

const BASE_URL = 'http://localhost/api';
interface State {
  trips: Trip[];
  getTrips: () => void;
}
interface Trip {
  id: number;
  name: string;
  description: string;
}
const useBasicStore = create<State>((set, get) => ({
  trips: [],
  getTrips: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/trips`);
      const data = response.data;
      set({ trips: data });
    } catch (error) {
      console.error('Failed to fetch trips:', error);
    }
  },
}));

export default function App() {
  const { getTrips } = useBasicStore(); 
  useEffect(() => {
    getTrips();
  }, []);
  const { trips } = useBasicStore.getState();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={trips}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.id} / {item.name} / {item.description}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  subheader: {
    fontSize: 18,
    marginVertical: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
