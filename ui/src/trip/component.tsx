import { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, Alert } from 'react-native';
import { store } from './store.ts';
import { getTrips, deleteTrip } from './service.ts';

export default function Trip() {
  store();
  useEffect(() => {
    getTrips();
  }, []);
  const { trips, isDeleting } = store.getState();

  const handleDeletePress = (tripId: number) => {
    Alert.alert(
      'Delete Trip',
      'Are you sure you want to delete this trip?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => deleteTrip(tripId),
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <FlatList data={trips}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
            <Text>{item.id} / {item.name} / {item.description}</Text>
            <Pressable onPress={() => handleDeletePress(item.id)} disabled={isDeleting}>
              <Text style={styles.deleteButton}>Delete</Text>
            </Pressable>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
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
  deleteButton: {
    color: '#0a88cdeb',
    fontWeight: '600',
  },
});