import { Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { ExternalPathString, Href, Link, RelativePathString } from 'expo-router';

type LinkedButtonProps = {
  label: string;
  href: Href;
};

export function LinkedButton({ label, href }: LinkedButtonProps) {
  return (
    <Link href={href} style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </Link>
  );
}

type ButtonProps = {
  label: string;
  onPress: () => void;
};

export function Button({ label, onPress }: ButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    button: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
