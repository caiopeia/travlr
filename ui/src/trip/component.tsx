import { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, Alert } from 'react-native';
import { store } from './store.ts';
import { getTrips, deleteTrip, createTrip } from './service.ts';

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

  const handleAddTrip = async () => {
    const existingTrips = store.getState().trips;
    const nextId = existingTrips.length > 0 ? Math.max(...existingTrips.map((t) => t.id)) + 1 : 1;
    const newTrip = {
      name: `New Trip ${nextId}`,
      description: 'Created from UI button',
    };

    await createTrip(newTrip);
  };

  return (
    <View style={styles.wrapper}>
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
      <Pressable style={styles.addButton} onPress={handleAddTrip}>
        <Text style={styles.addButtonText}>Add Trip</Text>
      </Pressable>
    </View>
  );
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
  wrapper: {
    flex: 1,
  },
  addButton: {
    padding: 14,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});