import { useEffect } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { cores } from "../themes/cores";

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        async function inicializarApp() {
            try {
                const timerPromessa = new Promise((resolve) => {
                    setTimeout(resolve, 3000);
                });

                const checarLogin = async () => {
                const token = await AsyncStorage.getItem("token");
                return token !== null;
                };

                const [_, usuarioLogado] = await Promise.all([timerPromessa, checarLogin(),]);

                if (usuarioLogado) {
                    navigation.replace("TabRoutes");
                } else {
                    navigation.replace("Login");
                }
            } catch (error) {
                console.error("Erro ao inicializar aplicação:", error);

                Alert.alert("Erro", "Não foi possível inicializar a aplicação.");

                navigation.replace("Login");
            }
        }

        inicializarApp();
    }, [navigation]);

    return (
        <View style={styles.splashContainer}>
            <Image
                source={require("../assets/img/LogoBROE.png")}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        backgroundColor: cores.fundo,
        justifyContent: "center",
        alignItems: "center",
    },

    logo: {
        width: 250,
        height: 250,
    },
});