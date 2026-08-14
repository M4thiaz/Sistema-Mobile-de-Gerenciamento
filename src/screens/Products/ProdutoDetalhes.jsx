import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useFocusEffect, useNavigation, } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Botao from '../../components/Botao';
import { deletarProduto } from '../../services/produtos';

export default function ProdutoDetalhes({ route }) {

    const navigation = useNavigation();

    const { produtoId } = route.params;

    const [produto, setProduto] = useState(null);
    const [carregando, setCarregando] = useState(true);


    async function carregarProduto() {

        try {

            const dadosSalvos = await AsyncStorage.getItem('ProdutosCadastrados');

            if (!dadosSalvos) {
                return;
            }

            const produtos = JSON.parse(dadosSalvos);

            const produtoEncontrado = produtos.find(item => String(item.id) === String(produtoId)
            );

            setProduto(produtoEncontrado);

        } catch (error) {

            console.error('Erro ao carregar produto:', error);

        } finally {

            setCarregando(false);

        }
    }

    async function confirmarExclusao() {

        Alert.alert('Excluir produto', `Tem certeza que deseja excluir ${produto.nome}?`,
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
                            await deletarProduto(produto.id);

                            Alert.alert('Sucesso', 'Produto excluído com sucesso.',
                                [
                                    {
                                        text: 'OK',
                                        onPress: () => navigation.goBack(),
                                    },
                                ]
                            );

                        } catch (error) {

                            Alert.alert('Erro', error.message);

                        }
                    },
                },
            ]
        );
    }

    useFocusEffect(
        useCallback(() => { carregarProduto(); }, [produtoId])
    );


    if (carregando) {

        return (
            <View style={styles.centralizado}>

                <ActivityIndicator size="large" />

            </View>
        );

    }


    if (!produto) {

        return (
            <View style={styles.centralizado}>

                <Text>
                    Produto não encontrado.
                </Text>

            </View>
        );

    }


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

            <Text style={styles.titulo}>
                Detalhes do produto
            </Text>

            <ScrollView>

                <View style={styles.card}>

                    <Text style={styles.label}>
                        Nome
                    </Text>

                    <Text style={styles.valor}>
                        {produto.nome}
                    </Text>


                    {/* == == // == == */}


                    <Text style={styles.label}>
                        Descrição
                    </Text>

                    <Text style={styles.valor}>
                        {produto.descricao}
                    </Text>


                    {/* == == // == == */}


                    <Text style={styles.label}>
                        Categoria
                    </Text>

                    <Text style={styles.valor}>
                        {produto.categoria}
                    </Text>


                    {/* == == // == == */}


                    <Text style={styles.label}>
                        Quantidade
                    </Text>

                    <Text style={styles.valor}>
                        {produto.quantidade}
                    </Text>


                    {/* == == // == == */}


                    <Text style={styles.label}>
                        Valor
                    </Text>

                    <Text style={styles.valor}>
                        R$ {Number(produto.valor)
                            .toFixed(2)
                            .replace('.', ',')}
                    </Text>

                    <Text>{'\n'}</Text>
                    {/* == == // == == */}


                    <Botao
                        onPress={() => {

                            navigation.navigate(
                                'EditarProduto',
                                {
                                    produtoId: produto.id,
                                }
                            );

                        }}
                        title="Editar informações"
                    />


                    <Pressable
                        style={styles.botaoExcluir}
                        onPress={confirmarExclusao}
                    >
                        <Text style={styles.textoBotaoExcluir}>
                            Excluir produto
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