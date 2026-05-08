import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="view" options={{ headerShown: false }} />
    </Stack>
  );
}
