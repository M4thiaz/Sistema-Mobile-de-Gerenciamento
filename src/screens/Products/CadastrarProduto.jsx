import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator, } from 'react-native';

import { cadastrarProduto } from '../../services/produtos';

export default function CadastrarProduto({ navigation }) {

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');

    const [salvando, setSalvando] = useState(false);


    async function salvarProduto() {

        // VALIDAÇÃO
        if (
            !nome.trim() ||
            !descricao.trim() ||
            !categoria.trim() ||
            !quantidade.trim() ||
            !valor.trim()
        ) {
            Alert.alert('Atenção', 'Preencha todos os campos.');

            return;
        }

        const quantidadeNumero = Number(quantidade);
        const valorNumero = Number(valor.replace(',', '.'));

        if (isNaN(quantidadeNumero) || quantidadeNumero <= 0) {
            Alert.alert('Atenção', 'Informe uma quantidade válida.');

            return;
        }

        if (isNaN(valorNumero) || valorNumero <= 0) {
            Alert.alert('Atenção', 'Informe um valor válido.');

            return;
        }


        try {

            setSalvando(true);

            await cadastrarProduto(
                nome.trim(),
                descricao.trim(),
                categoria.trim(),
                quantidadeNumero,
                valorNumero
            );

            Alert.alert('Sucesso', 'Produto cadastrado com sucesso.',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );

        } catch (error) {
            Alert.alert('Erro', error.message);

        } finally {
            setSalvando(false);

        }
    }


    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>
                Cadastrar produto
            </Text>


            <Text style={styles.label}>
                Nome
            </Text>

            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Nome do produto"
            />


            <Text style={styles.label}>
                Descrição
            </Text>

            <TextInput
                style={[styles.input, styles.inputDescricao]}
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Descrição do produto"
                multiline
            />


            <Text style={styles.label}>
                Categoria
            </Text>

            <TextInput
                style={styles.input}
                value={categoria}
                onChangeText={setCategoria}
                placeholder="Ex: Eletrônicos"
            />


            <Text style={styles.label}>
                Quantidade
            </Text>

            <TextInput
                style={styles.input}
                value={quantidade}
                onChangeText={setQuantidade}
                placeholder="Quantidade disponível"
                keyboardType="numeric"
            />


            <Text style={styles.label}>
                Valor
            </Text>

            <TextInput
                style={styles.input}
                value={valor}
                onChangeText={setValor}
                placeholder="Ex: 1500,00"
                keyboardType="decimal-pad"
            />


            <Pressable
                style={styles.botao}
                onPress={salvarProduto}
                disabled={salvando}
            >

                {salvando ? (
                    <ActivityIndicator color="#fff" />) : (
                    <Text style={styles.textoBotao}>
                        Cadastrar produto
                    </Text>
                )}

            </Pressable>

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

    inputDescricao: {
        height: 100,
        paddingTop: 15,
        textAlignVertical: 'top',
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

});