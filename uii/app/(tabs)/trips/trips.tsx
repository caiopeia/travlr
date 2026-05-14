import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native';
import { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { Button, LinkedButton } from '@/components/button';
import { useTrips } from './trips_store';

export default function Trips() {
  const { trips, current, fetch, create, deleteTrip, toggleCurrent } = useTrips();
  useFocusEffect(
    useCallback(() => {
      fetch();
    }, [fetch])
  );

  return (
    <View style={styles.container}>
      <FlatList data={trips.sort((a, b) => a.id!! - b.id!!)}
        style={{ width: '100%' }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          const expanded = current === item.id;
          return (
            <View style={styles.itemContainer}>
              <Pressable onPress={() => toggleCurrent(item.id!!)} style={styles.itemHeader}>
                <Text style={expanded ? styles.expandedItemTitle : styles.itemTitle}>
                  {item.id} - {item.name}
                </Text>
                <Text style={expanded ? styles.expandedExpandHint : styles.expandHint}>
                  {expanded ? '▲' : '▼'}
                </Text>
              </Pressable>
              {expanded && (
                <View style={styles.text}>
                  <Text style={styles.text}>{item.description}</Text>
                  <LinkedButton label="Edit" href={{ pathname: "/trips/trip", params: { id: item.id } }} />
                  <Button label="Delete" onPress={() => deleteTrip(item.id!!)} />
                </View>
              )}
            </View>
          );
        }}
      />
      <Button label="Create Trip" onPress={create} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    marginBottom: 16,
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
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  expandedItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffd33d',
  },
  expandHint: {
    fontSize: 14,
    color: '#fff',
  },
  expandedExpandHint: {
    fontSize: 14,
    color: '#ffd33d',
  },
});
