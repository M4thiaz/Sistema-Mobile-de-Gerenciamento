import { useCallback, useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet, ActivityIndicator, ScrollView, } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, } from '@react-navigation/native';
import { cores } from '../themes/cores'

import { listarProdutos } from '../services/produtos';

export default function Home() {

    const navigation = useNavigation();

    const [produtos, setProdutos] = useState([]);
    const [busca, setBusca] = useState('');
    const [carregando, setCarregando] = useState(true);

    function Categoria({ icone, nome }) {

        return (
            <Pressable style={styles.categoria}>

                <View style={styles.categoriaIcone}>

                    <Feather
                        name={icone}
                        size={24}
                        color="#333"
                    />

                </View>

                <Text style={styles.categoriaNome}>
                    {nome}
                </Text>

            </Pressable>
        );
    }


    function ProdutoMiniCard({ produto, onPress }) {

        return (
            <Pressable style={styles.produtoCard} onPress={onPress}>
                <View style={styles.imagemProduto}>

                    <Feather
                        name="image"
                        size={35}
                        color="#6d6d6d"
                    />

                </View>

                <Text
                    style={styles.produtoNome}
                    numberOfLines={1}
                >
                    {produto.nome}
                </Text>

                <Text style={styles.produtoValor}>
                    R$ {Number(produto.valor)
                        .toFixed(2)
                        .replace('.', ',')}
                </Text>

            </Pressable>
        );
    }

    async function carregarProdutos() {

        try {

            setCarregando(true);

            const lista = await listarProdutos();

            setProdutos(lista);

        } catch (error) {

            console.error(
                'Erro ao carregar produtos:',
                error
            );

        } finally {

            setCarregando(false);

        }
    }


    useFocusEffect(
        useCallback(() => {
            carregarProdutos();
        }, [])
    );


    const produtosFiltrados = produtos.filter(produto =>
        produto.nome
            .toLowerCase()
            .includes(busca.toLowerCase())
    );


    const produtosRecentes = [...produtos]
        .reverse()
        .slice(0, 6);


    if (carregando) {

        return (
            <View style={styles.carregando}>

                <ActivityIndicator size="large" />

            </View>
        );

    }


    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            <View style={styles.header}>

                <Text style={styles.logo}>
                    BROE
                </Text>

                <View style={styles.headerIcons}>

                    <Pressable style={styles.iconButton}>
                        <Feather
                            name="bell"
                            size={22}
                            color="#333"
                        />
                    </Pressable>

                    <Pressable
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Usuarios')}
                    >
                        <Feather
                            name="user"
                            size={22}
                            color="#333"
                        />
                    </Pressable>

                </View>

            </View>

            <View style={styles.buscaContainer}>

                <Feather
                    name="search"
                    size={20}
                    color="#777"
                />

                <TextInput
                    style={styles.inputBusca}
                    placeholder="Buscar produtos..."
                    value={busca}
                    onChangeText={setBusca}
                />

            </View>

            <Text style={styles.tituloSecao}>
                Categorias
            </Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categorias}
            >

                <Categoria
                    icone="smartphone"
                    nome="Celulares"
                />

                <Categoria
                    icone="monitor"
                    nome="Informática"
                />

                <Categoria
                    icone="shopping-bag"
                    nome="Roupas"
                />

                <Categoria
                    icone="home"
                    nome="Casa"
                />

                <Categoria
                    icone="truck"
                    nome="Autos"
                />

            </ScrollView>

            <View style={styles.banner}>

                <Text style={styles.bannerTitulo}>
                    VENDA NA BROE
                </Text>

                <Text style={styles.bannerTexto}>
                    Fácil. Rápido. Seguro.
                </Text>

                <Pressable
                    style={styles.botaoAnunciar}
                    onPress={() =>
                        navigation.navigate('CadastrarProduto')}
                >

                    <Text style={styles.textoBotao}>
                        Anunciar produto
                    </Text>

                </Pressable>

            </View>

            {busca.length > 0 ? (

                <View>

                    <Text style={styles.tituloSecao}>
                        Resultados da busca
                    </Text>

                    {produtosFiltrados.length === 0 ? (

                        <Text style={styles.vazio}>
                            Nenhum produto encontrado.
                        </Text>

                    ) : (

                        <View style={styles.grid}>

                            {produtosFiltrados.map(produto => (
                                <ProdutoMiniCard
                                    key={produto.id}
                                    produto={produto}
                                    onPress={() =>
                                        navigation.navigate(
                                            'ProdutoDetalhes',
                                            {
                                                produtoId:
                                                    produto.id,
                                            }
                                        )
                                    }
                                />
                            ))}

                        </View>

                    )}

                </View>

            ) : (

                <>

                    <Text style={styles.tituloSecao}>
                        Produtos perto de você
                    </Text>

                    <View style={styles.grid}>

                        {produtos.slice(0, 6).map(produto => (

                            <ProdutoMiniCard
                                key={produto.id}
                                produto={produto}
                                onPress={() =>
                                    navigation.navigate(
                                        'ProdutoDetalhes',
                                        {
                                            produtoId:
                                                produto.id,
                                        }
                                    )
                                }
                            />

                        ))}

                    </View>

                    <Text style={styles.tituloSecao}>
                        Adicionados recentemente
                    </Text>

                    <View style={styles.grid}>

                        {produtosRecentes.map(produto => (

                            <ProdutoMiniCard
                                key={`recente-${produto.id}`}
                                produto={produto}
                                onPress={() =>
                                    navigation.navigate(
                                        'ProdutoDetalhes',
                                        {
                                            produtoId:
                                                produto.id,
                                        }
                                    )
                                }
                            />

                        ))}

                    </View>

                </>

            )}

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },

    carregando: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },


    //HEADER

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 18,
    },

    logo: {
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: 2,
    },

    headerIcons: {
        flexDirection: 'row',
        gap: 10,
    },

    iconButton: {
        padding: 5,
    },


    //BUSCA

    buscaContainer: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 25,
    },

    inputBusca: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
    },


    //SEÇÔES

    tituloSecao: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 5,
    },


    //CATEGORIAS

    categorias: {
        marginBottom: 25,
    },

    categoria: {
        alignItems: 'center',
        width: 75,
        marginRight: 12,
    },

    categoriaIcone: {
        width: 55,
        height: 55,
        borderRadius: 30,
        backgroundColor: cores.txt,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 7,
    },

    categoriaNome: {
        fontSize: 12,
        textAlign: 'center',
    },


    //BANNER

    banner: {
        backgroundColor: cores.secundaria,
        borderRadius: 15,
        padding: 22,
        marginBottom: 30,
    },

    bannerTitulo: {
        fontSize: 22,
        fontWeight: 'bold',
    },

    bannerTexto: {
        fontSize: 15,
        marginTop: 5,
        marginBottom: 18,
    },

    botaoAnunciar: {
        backgroundColor: '#333',
        borderRadius: 10,
        paddingVertical: 13,
        alignItems: 'center',
    },

    textoBotao: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },


    //PRODUTOS

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    produtoCard: {
        width: '48%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 15,
        backgroundColor: '#fff',
    },

    imagemProduto: {
        height: 120,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },

    produtoNome: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 10,
        marginTop: 10,
    },

    produtoValor: {
        fontSize: 17,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 12,
    },

    vazio: {
        color: '#777',
        textAlign: 'center',
        marginVertical: 30,
    },

});