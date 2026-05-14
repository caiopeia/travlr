import { Modal, View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type TextAreaEditorProps = {
  title: string;
  placeholder?: string;
  isVisible: boolean;
  value: string;
  onCancel: () => void;
  onSave: () => void;
  onChangeText: (text: string) => void;
};

export function TextAreaEditor({ isVisible, title, placeholder, value, onCancel, onChangeText, onSave }: TextAreaEditorProps) {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Pressable onPress={onCancel}>
              <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>
            <Text style={styles.title}>
                {title}
            </Text>
            <Pressable onPress={onSave}>
              <MaterialIcons name="save" color="#fff" size={22} />
            </Pressable>
          </View>
          <View style={styles.content}>
            <TextInput
              multiline
              placeholder={placeholder || 'Enter text...'}
              placeholderTextColor="#ccc"
              style={styles.textInput}
              value={value}
              onChangeText={onChangeText}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '66%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '9%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    height: '91%',
    padding: 20,
  },
  textInput: {
    height: '100%',
    color: '#fff',
    fontSize: 16,
  },
});
