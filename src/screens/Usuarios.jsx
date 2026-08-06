import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>Página Usuários</Text>
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
