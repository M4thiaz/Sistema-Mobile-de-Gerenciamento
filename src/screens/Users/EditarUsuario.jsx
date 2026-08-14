import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { atualizarUsuario } from '../../services/user';

export default function EditarUsuario({ route, navigation }) {

    const { usuarioId } = route.params;

    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [estado, setEstado] = useState('');
    const [cargo, setCargo] = useState('');

    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

    async function carregarUsuario() {
        try {
            const dadosSalvos = await AsyncStorage.getItem(
                'UsuariosCadastrados'
            );

            if (!dadosSalvos) {
                throw new Error('Nenhum usuário cadastrado.');
            }

            const usuarios = JSON.parse(dadosSalvos);

            const usuarioEncontrado = usuarios.find(
                item => String(item.id) === String(usuarioId)
            );

            if (!usuarioEncontrado) {
                throw new Error('Usuário não encontrado.');
            }

            setUsuario(usuarioEncontrado.usuario || '');
            setEmail(usuarioEncontrado.email || '');
            setEstado(usuarioEncontrado.estado || '');
            setCargo(usuarioEncontrado.cargo || '');

        } catch (error) {
            Alert.alert('Erro', error.message);
            navigation.goBack();

        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarUsuario();
    }, []);

    async function salvarAlteracoes() {

        if (!usuario.trim() || !email.trim()) {
            Alert.alert('Atenção', 'Usuário e e-mail são obrigatórios.');
            return;
        }

        try {
            setSalvando(true);

            await atualizarUsuario(usuarioId, {
                usuario: usuario.trim(),
                email: email.trim(),
                estado: estado.trim(),
                cargo: cargo.trim(),
            });

            Alert.alert('Sucesso', 'Usuário atualizado com sucesso.',
                [
                    {
                        text: 'Ok',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );

        } catch (error) {
            Alert.alert(
                'Erro',
                error.message
            );

        } finally {
            setSalvando(false);
        }
    }

    if (carregando) {
        return (
            <View style={styles.centralizado}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

            <Text style={styles.titulo}>
                Editar usuário
            </Text>

            <ScrollView>

                <Text style={styles.label}>
                    Usuário
                </Text>

                <TextInput
                    style={styles.input}
                    value={usuario}
                    onChangeText={setUsuario}
                    placeholder="Nome de usuário"
                />

                {/* == == // == ==  */}

                <Text style={styles.label}>
                    E-mail
                </Text>

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {/* == == // == ==  */}

                <Text style={styles.label}>
                    Estado
                </Text>

                <TextInput
                    style={styles.input}
                    value={estado}
                    onChangeText={setEstado}
                    placeholder="Ex: Minas Gerais"
                />

                {/* == == // == ==  */}

                <Text style={styles.label}>
                    Cargo
                </Text>

                <TextInput
                    style={styles.input}
                    value={cargo}
                    onChangeText={setCargo}
                    placeholder="Ex: Gerente de Marketing"
                />

                <Text>{'\n'}</Text>
                {/* == == // == ==  */}

                <Pressable
                    style={styles.botao}
                    onPress={salvarAlteracoes}
                    disabled={salvando}
                >
                    {salvando ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.textoBotao}>
                            Salvar alterações
                        </Text>
                    )}
                </Pressable>

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
        marginBottom: 25,
    },

    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 6,
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 18,
    },

    botao: {
        height: 50,
        borderRadius: 10,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    textoBotao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    centralizado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

