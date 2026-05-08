import { Text, View, StyleSheet, FlatList } from 'react-native';
import { store } from './store.ts';


export default function Trips() {
  const { trips } = store();

  return (
    <View style={styles.container}>
      <FlatList data={trips}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item: trip }) => {
          return (
            <Text style={styles.text}>{trip.name}</Text>
          );
        }}
      />  
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
});
