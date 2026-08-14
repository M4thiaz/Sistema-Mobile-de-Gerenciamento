import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, Linking, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tipografia } from "../themes/tipografia";
import { espacamento } from "../themes/espacamento";
import { radius } from "../themes/radius";
import { cores } from "../themes/cores";
import LogoBROE from '../components/LogoBROE';
import Botao from '../components/Botao'

export default function Cadastro() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                Fale Conosco
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.corpo}>

                    <LogoBROE />

                    <Text style={styles.txt}>
                        A BROE é uma plataforma digital de marketplace que conecta compradores e vendedores em um único ambiente.
                    </Text>

                    <Text style={styles.titulo2}>
                        Horários de atendimento (SAC):
                    </Text>

                    <Text style={styles.txt}>
                        Segunda à Sexta : 12:00 - 22:00 {'\n'} {'\n'}
                        Sábados e Domingos : 12:00 - 20:00 {'\n'} {'\n'}
                        Feriádos: Fechado
                    </Text>

                    <Botao
                        title={'Entre em contato via Whatsapp'}
                        onPress={() => Linking.openURL('https://wa.me/5521981831592?text=Olá!%20Gostaria%20de%20entrar%20em%20contato%20com%20a%20BROE.')}
                    />

                </View>

                <View style={styles.rodape}>

                    <Text style={styles.txtRodape}>
                        Rua São Francisco Xavier 417 {'\n'}
                    </Text>
                    <Text style={styles.txtRodape}>
                        matheussilvasoares4321@gmail.com {'\n'}
                    </Text>
                    <Text style={styles.txtRodape}>
                        (21) 98183-1592 {'\n'}
                    </Text>

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.fundo,
    },
    corpo: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        padding: 20
    },
    titulo2: {
        fontSize: tipografia.pequeno,
        fontWeight: 'bold',
        marginVertical: 50,
        color: cores.primaria
    },
    txt: {
        fontSize: tipografia.txt,
        textAlign: 'center',
        marginBottom: 15,

    },
    rodape: {
        width: '100%',
        backgroundColor: cores.fundo2,
        marginTop: '50%',

    },
    txtRodape: {
        fontSize: tipografia.txt,
        textAlign: 'left',
        padding: 8,

    },
},
);
