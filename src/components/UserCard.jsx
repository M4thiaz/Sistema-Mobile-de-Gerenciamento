import { View, Text, Pressable, StyleSheet, } from 'react-native';

export default function UserCard({ usuario, onPress }) {
    return (
        <Pressable
            style={styles.card}
            onPress={onPress}
        >
            <View>
                <Text style={styles.nome}>
                    {usuario.usuario}
                </Text>

                <Text style={styles.email}>
                    {usuario.email}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({

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
        color: '#6d6d6d',
    },

});

