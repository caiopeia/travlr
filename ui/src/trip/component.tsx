import { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { store } from './store.ts';
import { getTrips } from './service.ts';

export default function Trip() {
  store();
  useEffect(() => {
    getTrips();
  }, []);
  const { trips } = store.getState();

  return (
    <FlatList data={trips}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
            <Text>{item.id} / {item.name} / {item.description}</Text>
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
});