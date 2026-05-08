import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { getAll } from './service'; 
import { store } from './store';

export default function Trips() {
  const navigation = useNavigation();
  const { trips } = store();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Trips screen focused');
      getAll();
    });

    return unsubscribe;
  }, [navigation]);
  
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
