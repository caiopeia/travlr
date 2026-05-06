import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { store } from './TripStore.ts';
import { get } from './TripService.ts';

export default function Trip({ route }: { route: any }): React.JSX.Element {
  const { id } = route.params;
  store();
  useEffect(() => {
    get(id);
  }, []);
  const { trip } = store.getState();

  return (
    <View>
      {trip && (
        <View>
          <Text>{trip.id}</Text>
          <Text>{trip.name}</Text>
          <Text>{trip.description}</Text>
        </View>
      ) || (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
}
