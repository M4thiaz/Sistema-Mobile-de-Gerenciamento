import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function ProductCard({ produto, onPress }) {

    return (
        <Pressable style={styles.card} onPress={onPress}        >

            <View style={styles.informacoes}>

                <Text style={styles.nome}>
                    {produto.nome}
                </Text>

                <Text style={styles.categoria}>
                    {produto.categoria}
                </Text>

                <Text
                    style={styles.descricao}
                    numberOfLines={2}
                >
                    {produto.descricao}
                </Text>

                <View style={styles.rodape}>

                    <Text style={styles.valor}>
                        R$ {Number(produto.valor).toFixed(2).replace('.', ',')}
                    </Text>

                    <Text style={styles.quantidade}>
                        {produto.quantidade} un.
                    </Text>

                </View>

            </View>

        </Pressable>
    );
}

const styles = StyleSheet.create({

    card: {
        padding: 18,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: '#fff',
    },

    informacoes: {
        flex: 1,
    },

    nome: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    categoria: {
        fontSize: 14,
        color: '#777',
        marginBottom: 8,
    },

    descricao: {
        fontSize: 15,
        color: '#555',
        marginBottom: 15,
    },

    rodape: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    valor: {
        fontSize: 19,
        fontWeight: 'bold',
    },

    quantidade: {
        fontSize: 14,
        color: '#6d6d6d',
    },

});