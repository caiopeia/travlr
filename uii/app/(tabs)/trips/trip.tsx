import { Text, View, TextInput } from 'react-native';
import { useEffect } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Button } from '@/components/button';
import { useTripStore } from './trip_store';
import { useLayoutEffect } from 'react';
import { useNavigation } from 'expo-router';

export default function Trip(): React.JSX.Element {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { trip, fetch, update, setDescription, patch } = useTripStore();
  
  useEffect(() => {
    fetch(Number(id!!));
  }, [fetch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: trip?.name || 'Loading...',
    });
  }, [navigation, trip?.name]);

  const saveAndBack = (trip: any) => {
    update(trip);
    router.back();
  };

  const onChangeDescription = (value: string) => {
    setDescription(value);
    patch(trip?.id!!, { description: value });
  };

  return (
    <View>
      {trip && (
        <View>
          <TextInput
            value={trip.description}
            onChangeText={onChangeDescription}
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
