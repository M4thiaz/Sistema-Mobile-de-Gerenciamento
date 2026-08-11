import { useCallback, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert, } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tipografia } from "../themes/tipografia";
import { espacamento } from "../themes/espacamento";
import { radius } from "../themes/radius";
import { cores } from "../themes/cores";
import UserCard from '../components/UserCard';

import { listarUsuarios } from '../services/user';

export default function Perfil() {

    const navigation = useNavigation();

    const [usuarios, setUsuarios] = useState([]);
    const [busca, setBusca] = useState('');

    async function carregarUsuarios() {
        const usuariosSalvos = await listarUsuarios();
        setUsuarios(usuariosSalvos);

    }

    useFocusEffect(
        useCallback(() => {
            carregarUsuarios();
        }, [])
    );

    const usuariosFiltrados = usuarios.filter((usuario) => {

        const nome = usuario.usuario?.toLowerCase() || '';
        const email = usuario.email?.toLowerCase() || '';
        const estado = usuario.estado?.toLowerCase() || '';
        const cargo = usuario.cargo?.toLowerCase() || '';
        const termoBusca = busca.toLowerCase();

        return (
            nome.includes(termoBusca) ||
            email.includes(termoBusca)

        );
    });

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>
                Perfil
            </Text>

            <Text style={styles.subtitulo}>
                Usuários cadastrados
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Buscar por nome ou e-mail"
                value={busca}
                onChangeText={setBusca}
            />

            <FlatList
                data={usuariosFiltrados}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <UserCard
                        usuario={item}
                        onPress={() => navigation.navigate('UsuarioDetalhes', {
                            usuarioId: item.id
                        })}
                    />

                )}
                ListEmptyComponent={
                    <Text style={styles.vazio}>
                        Nenhum usuário encontrado.
                    </Text>
                }
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },

    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    subtitulo: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
    },

    card: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 10,
    },

    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    email: {
        fontSize: 14,
        color: '#666',
    },

    vazio: {
        textAlign: 'center',
        marginTop: 30,
        color: '#777',
    },

});

