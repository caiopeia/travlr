import { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { store } from './TripsStore.ts';
import { getAll, deleteTrip, create, toggleCurrent } from './TripsService.ts';
import { Button } from '@react-navigation/elements';

export default function Trips() {
  const navigation = useNavigation();
  store();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Trips screen focused');
      getAll();
    });

    return unsubscribe;
  }, [navigation]);
  const { trips, current } = store.getState();

  const handleDeletePress = (tripId: number) => {
    Alert.alert(
      'Delete Trip',
      'Are you sure you want to delete this trip?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => await deleteTrip(tripId),
          style: 'destructive',
        },
      ],
    );
  };

  const handleCreate = async () => {
    const existing = store.getState().trips;
    const nextId = existing.length > 0 ? Math.max(...existing.map((t) => t.id!!)) + 1 : 1;
    const newTrip = {
      id: null,
      name: `New Trip ${nextId}`,
      description: 'Created from UI button',
    };

    await create(newTrip);
  };

  return (
    <View style={styles.wrapper}>
      <FlatList data={trips}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          const expanded = current === item.id;
          return (
            <View style={styles.itemContainer}>
              <Pressable onPress={() => toggleCurrent(item.id!!)} style={styles.itemHeader}>
                <Text style={styles.expandHint}>{expanded ? '▲' : '▼'}</Text>
                <Text style={styles.itemTitle}>{item.id} / {item.name}</Text>
                <Pressable onPress={() => handleDeletePress(item.id!)} style={styles.deleteButtonWrapper}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </Pressable>
              </Pressable>
              {expanded && (
                <View style={styles.itemBody}>
                  <Text>{item.description}</Text>
                  <Button screen="Trip" params={{ id: item.id }}>
                    Edit
                  </Button>
                </View>
              )}
            </View>
          );
        }}
      />
      <Pressable style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.createButtonText}>Create Trip</Text>
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
  createButton: {
    padding: 14,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});