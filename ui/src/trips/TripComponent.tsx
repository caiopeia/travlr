import React, { useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { store, setDescription } from './TripStore.ts';
import { get, save } from './TripService.ts';

export default function Trip({ route }: { route: any }): React.JSX.Element {
  const navigation = useNavigation();
  const { id } = route.params;
  store();
  useEffect(() => {
    get(id);
  }, []);
  const saveAndBack = (trip: any) => {
    save(trip);
    navigation.goBack();
  };
  const { trip } = store.getState();

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
          <Pressable
            onPress={() => saveAndBack(trip)}
            style={{
              backgroundColor: '#000000',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 4,
              marginTop: 15,
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
              Save Trip
            </Text>
          </Pressable>
        </View>
      ) || (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
}
