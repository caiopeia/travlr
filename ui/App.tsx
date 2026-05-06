import { StyleSheet } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import Trips from './src/trips/TripsComponent';
import Trip from './src/trips/TripComponent';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function TripsScreen() {
  return (
    <Trips />
  );
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Trips',
  screenOptions: {
    headerStyle: { backgroundColor: 'black' },
    headerTintColor: 'white',
  },
  screens: {
    Trips: {
      screen: TripsScreen,
      options: {
        title: 'Trips',
      },
    },
    Trip: {
      screen: Trip,
      options: {
        title: 'Trip',
      },
    }
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: 'lightgrey',
  },
});
