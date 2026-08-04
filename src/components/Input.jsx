import { StyleSheet, TextInput } from "react-native";

export default function Input({ placeholder, onPress, value, setValue }) {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            onChangeText={setValue}
            value={value}
        />
    )
}

const styles = StyleSheet.create({
    input: {

    },
});