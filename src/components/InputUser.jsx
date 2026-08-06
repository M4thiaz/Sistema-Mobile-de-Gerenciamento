import { StyleSheet, TextInput, View } from "react-native";
import { tipografia } from "../themes/tipografia";
import { espacamento } from "../themes/espacamento";
import { radius } from "../themes/radius";
import { cores } from "../themes/cores";

export default function InputUser({seguranca, placeholder, onPress, value, setValue }) {
    return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            onChangeText={setValue}
            value={value}
            secureTextEntry={seguranca}
        />
    </View>

    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: espacamento.md,
        marginVertical: espacamento.md,
    },
    input: {
        borderBottomWidth: 2,
        borderColor: cores.secundaria,
        textAlign: 'left',
        
    },
});