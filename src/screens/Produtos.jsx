import { useCallback, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Pressable, ActivityIndicator, } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { tipografia } from "../themes/tipografia";
import { espacamento } from "../themes/espacamento";
import { radius } from "../themes/radius";
import { cores } from "../themes/cores";

import ProductCard from '../components/ProductCard';
import { listarProdutos } from '../services/produtos';

export default function Produtos() {

    const navigation = useNavigation();

    const [produtos, setProdutos] = useState([]);
    const [busca, setBusca] = useState('');
    const [carregando, setCarregando] = useState(true);


    async function carregarProdutos() {

        try {
            setCarregando(true);
            const lista = await listarProdutos();
            setProdutos(lista);

        } catch (error) {
            console.error('Erro ao carregar produtos:', error);

        } finally {
            setCarregando(false);

        }
    }

    useFocusEffect(useCallback(() => {
        carregarProdutos();
    }, [])
    );


    const produtosFiltrados = produtos.filter(produto => produto.nome
        .toLowerCase()
        .includes(busca.toLowerCase())
    );


    if (carregando) {
        return (
            <View style={styles.centralizado}>
                <ActivityIndicator size="large" />
            </View>
        );
    }


    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>
                Produtos
            </Text>


            <TextInput
                style={styles.inputBusca}
                value={busca}
                onChangeText={setBusca}
                placeholder="Buscar produto pelo nome..."
            />


            <Pressable
                style={styles.botaoCadastrar}
                onPress={() => {
                    navigation.navigate('CadastrarProduto');
                }}
            >
                <Text style={styles.textoBotao}>
                    + Cadastrar produto
                </Text>
            </Pressable>


            {produtosFiltrados.length === 0 ? (

                <View style={styles.centralizado}>

                    <Text style={styles.mensagem}>
                        Nenhum produto encontrado.
                    </Text>

                </View>

            ) : (

                <FlatList
                    data={produtosFiltrados}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <ProductCard
                            produto={item}
                            onPress={() => {
                                navigation.navigate('ProdutoDetalhes',
                                    {
                                        produtoId: item.id,
                                    }
                                );
                            }}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />

            )}

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
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    inputBusca: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 12,
    },

    botaoCadastrar: {
        height: 50,
        borderRadius: 10,
        backgroundColor: cores.elementos,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    textoBotao: {
        color: cores.secundaria,
        fontSize: 16,
        fontWeight: 'bold',
    },

    centralizado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    mensagem: {
        fontSize: 16,
        color: '#666',
    },

});