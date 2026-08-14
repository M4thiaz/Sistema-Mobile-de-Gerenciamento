import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Botao from '../../components/Botao';
import { deletarUsuario } from '../../services/user';

export default function UsuarioDetalhes({ route }) {

    const navigation = useNavigation();

    const { usuarioId } = route.params;

    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    async function carregarUsuario() {
        try {
            const dadosSalvos = await AsyncStorage.getItem(
                'UsuariosCadastrados'
            );

            if (!dadosSalvos) {
                return;
            }

            const usuarios = JSON.parse(dadosSalvos);

            const usuarioEncontrado = usuarios.find(
                item => String(item.id) === String(usuarioId)
            );

            setUsuario(usuarioEncontrado);

        } catch (error) {
            console.error('Erro ao carregar usuário:', error);

        } finally {
            setCarregando(false);
        }
    }

    // DELETAR USUÁRIO
    async function confirmarExclusao() {
        Alert.alert(
            'Excluir usuário',
            `Tem certeza que deseja excluir ${usuario.usuario}?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deletarUsuario(usuario.id);

                            Alert.alert(
                                'Sucesso',
                                'Usuário excluído com sucesso.',
                                [
                                    {
                                        text: 'OK',
                                        onPress: () => navigation.goBack(),
                                    },
                                ]
                            );

                        } catch (error) {
                            Alert.alert(
                                'Erro',
                                error.message
                            );
                        }
                    },
                },
            ]
        );
    }

    useFocusEffect(
        useCallback(() => {
            carregarUsuario();
        }, [usuarioId])
    );

    if (carregando) {
        return (
            <View style={styles.centralizado}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!usuario) {
        return (
            <View style={styles.centralizado}>
                <Text>
                    Usuário não encontrado.
                </Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

            <Text style={styles.titulo}>
                Detalhes do usuário
            </Text>

            <ScrollView>

                <View style={styles.card}>

                    <Text style={styles.label}>
                        Usuário
                    </Text>

                    <Text style={styles.valor}>
                        {usuario.usuario}
                    </Text>

                    {/* == == // == == */}

                    <Text style={styles.label}>
                        E-mail
                    </Text>

                    <Text style={styles.valor}>
                        {usuario.email}
                    </Text>

                    {/* == == // == == */}

                    <Text style={styles.label}>
                        Estado
                    </Text>

                    <Text style={styles.valor}>
                        {usuario.estado}
                    </Text>

                    {/* == == // == == */}

                    <Text style={styles.label}>
                        Área de atuação
                    </Text>

                    <Text style={styles.valor}>
                        {usuario.cargo}
                    </Text>

                    <Text>{'\n'}</Text>
                    {/* == == // == == */}

                    <Botao
                        onPress={() => {
                            navigation.navigate('EditarUsuario', {
                                usuarioId: usuario.id,
                            });
                        }}
                        title={'Editar informações'}
                    />

                    <Pressable
                        style={styles.botaoExcluir}
                        onPress={confirmarExclusao}
                    >
                        <Text style={styles.textoBotaoExcluir}>
                            Excluir usuário
                        </Text>
                    </Pressable>

                </View>

            </ScrollView>

        </KeyboardAvoidingView>
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
        marginBottom: 20,
    },

    card: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
    },

    label: {
        fontSize: 14,
        color: '#6d6d6d',
        marginBottom: 5,
        marginTop: 10,
    },

    valor: {
        fontSize: 18,
        fontWeight: '500',
    },

    centralizado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    botaoExcluir: {
        height: 50,
        borderRadius: 10,
        backgroundColor: '#d32f2f',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },

    textoBotaoExcluir: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

