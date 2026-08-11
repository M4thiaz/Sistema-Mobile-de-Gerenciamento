import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tipografia } from "../themes/tipografia";
import { espacamento } from "../themes/espacamento";
import { radius } from "../themes/radius";
import { cores } from "../themes/cores";

export default function Cadastro() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>Página Contato</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'bisque',
        alignItems: 'center',
        padding: '30px',
        justifyContent: 'center'

    },
},
);
