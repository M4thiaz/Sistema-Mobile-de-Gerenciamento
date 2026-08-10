import { StyleSheet, TextInput, View, Image } from "react-native";
import { tipografia } from "../themes/tipografia";
import { espacamento } from "../themes/espacamento";
import { radius } from "../themes/radius";
import { cores } from "../themes/cores";

export default function LogoBROE() {
    return (
    <View style={styles.container}>
        <Image
        style={styles.img}
        source={require('../assets/img/LogoBROE.png')}
        />
    </View>

    )
}

const styles = StyleSheet.create({
    container:{
        margin: espacamento.xl
    },
    img:{
        width:300,
        height:140
    }
});