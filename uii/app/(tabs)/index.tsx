import { View, StyleSheet } from 'react-native';
import { LinkedButton } from '@/components/button';

export default function Index() {
  return (
    <View style={styles.container}>
      <LinkedButton label="Trips" href="/trips/trips" />
      <LinkedButton label="About" href="/about" />
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
});
