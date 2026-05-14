import { Text, View, TextInput } from 'react-native';
import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useTripStore } from './trip_store';
import { useLayoutEffect } from 'react';
import { useNavigation } from 'expo-router';

export default function Trip(): React.JSX.Element {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { trip, fetch, patch, setDescription } = useTripStore();
  
  useEffect(() => {
    fetch(Number(id!!));
  }, [fetch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: trip?.name || 'Loading...',
    });
  }, [navigation, trip?.name]);

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
        </View>
      ) || (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
}
