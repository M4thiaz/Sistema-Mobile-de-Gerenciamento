import { useState } from 'react';
import { StyleSheet, Text, View, Alert, Image, Linking, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tipografia } from "../themes/tipografia";
import { espacamento } from "../themes/espacamento";
import { radius } from "../themes/radius";
import { cores } from "../themes/cores";
import LogoBROE from '../components/LogoBROE';

export default function Cadastro() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                Sobre Nós
            </Text>

            <View style={styles.corpo}>
                <LogoBROE />

                <Text style={styles.titulo2}>
                    Conheça quem criou o projeto:
                </Text>

                <Image
                    source={require('../assets/img/matheusRetrato.png')}
                    style={styles.retratoMatheus}
                />

                <Text style={styles.titulo3}>
                    Matheus da Silva Soares
                </Text>
                <Text style={styles.txt}>
                    Estudante de 19 anos, cursando Desenvolvimento de Sistemas de nível técnico pelo Senai Maracanã
                </Text>
                <Text style={styles.txt2}>
                    - Responsável pela estrutura lógica, arquétipa
                    e visual do projeto
                </Text>
                <Pressable onPress={() => Linking.openURL('https://github.com/M4thiaz')}>
                    <Text style={styles.hiperlink}>
                        Visite meu GitHub
                    </Text>
                </Pressable>

            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: cores.fundo,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    titulo2: {
        fontSize: tipografia.subtitulo,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: cores.secundaria
    },
    titulo3: {
        fontSize: tipografia.pequeno,
        marginTop: espacamento.sm,
        fontWeight: 'bold'
    },
    txt: {
        fontSize: tipografia.subPequeno,
        marginTop: espacamento.sm,
        textAlign: 'center'
    },
    txt2: {
        fontSize: tipografia.pequeno,
        marginTop: espacamento.lg,
        textAlign: 'center'
    },
    corpo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    retratoMatheus: {
        width: 150,
        height: 150,
        borderRadius: radius.full
    },
    hiperlink:{
        marginTop: 20,
        color: '#2563eb',
        textDecorationLine: 'underline',
        fontSize: 16,
    }
},
);
