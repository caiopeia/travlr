import { Text, View, TextInput } from 'react-native';
import { create } from 'zustand';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Button } from '@/components/button';


const BASE_URL = 'http://localhost/api';

// fixme - type is declared twice
export type Trip = {
  id: number | null;
  name: string;
  description: string;
};

export type State = {
  trip: Trip | null,
}

type Action = {
  fetch: (id: number) => Promise<void>,
  update: (trip: Trip) => Promise<void>,
  setDescription: (description: string) => void,
}

export const useTrip = create<State & Action>((set, get) => ({
  trip: null,
  fetch: async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/trips/${id}`);
      const trip: Trip = response.data;
      set((state) => ({ 
        trip: trip,
      }));
    } catch (error) {
      console.error('Failed to fetch trips:', error);
    }
  },
  update: async (trip: Trip) => {
    try {      
      await axios.put(`${BASE_URL}/trips/${trip.id}`, trip);
    } catch (error) {
      console.error('Failed to update trip:', error);
    }
  },
  setDescription: (description: string) => {
    set((state) => ({
      trip: state.trip ? { ...state.trip, description } : null,
    }));
  },
}));

export default function Trip(): React.JSX.Element {
  const { id } = useLocalSearchParams();  // fixme - is there a better way to get the id param here?
  const { trip, fetch, update, setDescription } = useTrip();
  useEffect(() => {
    fetch(Number(id!!));
  }, [fetch]);

  const saveAndBack = (trip: any) => {
    update(trip);
    router.back();
  };

  return (
    <View>
      {trip && (
        <View>
          <Text>{trip.id}</Text>
          <Text>{trip.name}</Text>
          <TextInput
            value={trip.description}
            onChangeText={(value) => setDescription(value)}
            placeholder="Enter trip description"
            editable={true}
            style={{
              borderWidth: 1,
              borderColor: '#aaa',
            }}
          />
          <Button label="Save" onPress={() => saveAndBack(trip)} />
        </View>
      ) || (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
}
