import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { tipografia } from "../themes/tipografia";
import { espacamento } from "../themes/espacamento";
import { radius } from "../themes/radius";
import { cores } from "../themes/cores";

export default function Botao({ title, onPress }) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        width: espacamento.xxl,
        padding: espacamento.sm,
        borderRadius: radius.lg,
        backgroundColor: cores.secundaria
    },
    text: {
        textAlign: 'center',
        fontSize: tipografia.pequeno,
        fontFamily: tipografia.fonte2,
    }
});