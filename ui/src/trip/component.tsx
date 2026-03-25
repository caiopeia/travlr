import { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, Alert } from 'react-native';
import { store } from './store.ts';
import { getTrips, deleteTrip, createTrip, toggleExpanded } from './service.ts';

export default function Trip() {
  store();
  useEffect(() => {
    getTrips();
  }, []);
  const { trips, isDeleting, expandedIds } = store.getState();

  const toggleExpand = (tripId: number) => {
    toggleExpanded(tripId);
  };

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
        renderItem={({ item }) => {
          const expanded = expandedIds.has(item.id);
          return (
            <View style={styles.itemContainer}>
              <Pressable onPress={() => toggleExpand(item.id)} style={styles.itemHeader}>
                <Text style={styles.expandHint}>{expanded ? '▲' : '▼'}</Text>
                <Text style={styles.itemTitle}>{item.id} / {item.name}</Text>
                <Pressable onPress={() => handleDeletePress(item.id)} disabled={isDeleting} style={styles.deleteButtonWrapper}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </Pressable>
              </Pressable>
              {expanded && (
                <View style={styles.itemBody}>
                  <Text>{item.description}</Text>
                </View>
              )}
            </View>
          );
        }}
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
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  expandHint: {
    fontSize: 14,
    color: '#666',
  },
  itemBody: {
    marginTop: 8,
    marginBottom: 8,
  },
  deleteButtonWrapper: {
    alignSelf: 'flex-end',
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