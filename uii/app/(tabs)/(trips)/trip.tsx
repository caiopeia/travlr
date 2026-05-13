import { Text, View, TextInput } from 'react-native';
import { useEffect } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Button } from '@/components/button';
import { useTripStore } from './trip_store';

export default function Trip(): React.JSX.Element {
  const { id } = useLocalSearchParams();
  const { trip, fetch, update, setDescription } = useTripStore();
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
