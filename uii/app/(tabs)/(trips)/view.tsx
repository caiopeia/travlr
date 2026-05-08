import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Trips() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your trips will appear here sf</Text>
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
