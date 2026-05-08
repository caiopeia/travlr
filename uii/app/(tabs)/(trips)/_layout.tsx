import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="trips" options={{ headerShown: false }} />
    </Stack>
  );
}
