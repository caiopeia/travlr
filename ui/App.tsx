import { StyleSheet } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import Trips from './src/trip/TripComponent';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <Trips />
  );
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerStyle: { backgroundColor: 'black' },
    headerTintColor: 'white',
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: 'Trips',
      },
    },
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
