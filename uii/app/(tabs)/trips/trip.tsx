import { Text, View, TextInput } from 'react-native';
import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useTripStore } from './trip_store';
import { useLayoutEffect } from 'react';
import { useNavigation } from 'expo-router';
import { TextAreaEditor } from '@/components/text-area-editor';
import { Button } from '@/components/button';

export default function Trip(): React.JSX.Element {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { 
    trip, fetch, patch, 
    descriptionEditorVisible, setDescriptionEditorVisible, 
    descriptionEditorValue, setDescriptionEditorValue, 
  } = useTripStore();
  
  
  useEffect(() => {
    fetch(Number(id!!));
  }, [fetch]);
  

  useLayoutEffect(() => {
    navigation.setOptions({
      title: trip?.name ?? 'Loading...',
    });
  }, [navigation, trip]);

  
  const onChangeDescription = (value: string) => {
    setDescriptionEditorValue(value);
  };

  const onOpenDescriptionEditor = () => {
    if(!trip) return;
    setDescriptionEditorValue(trip.description);
    setDescriptionEditorVisible(true);
  };

  const onCancelDescriptionEditor = () => {
    setDescriptionEditorVisible(false);
    setDescriptionEditorValue('');
  };

  const onSaveDescriptionEditor = () => {
    if(!trip) return;
    patch(trip.id!!, { description: descriptionEditorValue });
    setDescriptionEditorValue('');
    setDescriptionEditorVisible(false);
  }

  return (
    <View>
      {trip && (
        <View>
          <View>
            <TextInput
              value={trip.description}
              editable={false}
              multiline
              style={{
                borderWidth: 1,
                borderColor: '#aaa',
                height: 140,
                padding: 10,
                textAlignVertical: 'top',
              }}
            />
            <View style={{ flexDirection: 'row' }}>
              <Button label="Edit Description" onPress={onOpenDescriptionEditor} />
            </View>
          </View>
          <TextAreaEditor 
            title="Edit Description"
            placeholder = "Enter a description..."
            isVisible={descriptionEditorVisible} 
            onCancel={onCancelDescriptionEditor}
            onSave={onSaveDescriptionEditor}
            value={descriptionEditorValue}
            onChangeText={onChangeDescription}
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
