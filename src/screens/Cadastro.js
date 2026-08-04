import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro() {

  const navigation = useNavigation();

  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [email, setEmail] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  const realizarCadastro = async () => {
    try {

      if (!usuario || !email || !senha || !confirmarSenha) {
        throw new Error("Por favor, preencha todos os campos.");
      }

      if (senha !== confirmarSenha) {
        throw new Error("As senhas não coincidem.");
      }

      if (senha.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres.")
      }

      const checkLista = await AsyncStorage.getItem('UsuariosCadastrados');

      const validacaoLista = checkLista ? JSON.parse(checkLista) : [];

      const cadastroInvalido = validacaoLista.find(i => i.usuario === usuario || i.email === email)

      if (cadastroInvalido) {
        if (cadastroInvalido.email === email) throw new Error('Email já está sendo utilizado.')
        if (cadastroInvalido.usuario === usuario) throw new Error('Nome já está sendo utilizado.')
      }

      const novoCadastro = { usuario, email, senha }
      validacaoLista.push(novoCadastro);
      await AsyncStorage.setItem('UsuariosCadastrados', JSON.stringify(validacaoLista));

      Alert.alert('Cadastro realizado com sucesso!')

      setUsuario('');
      setEmail('');
      setSenha('');
      setConfirmarSenha('');

      navigation.navigate('Login')

    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível realizar seu cadastro.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Página de Cadastro</Text>
      </View>

      <View style={{ gap: 15 }}>
        <TextInput
          style={styles.inputs}
          placeholder='Digite um nome de usuário:'
          onChangeText={setUsuario}
          value={usuario} />

        <TextInput
          style={styles.inputs}
          placeholder='Digite um email:'
          onChangeText={setEmail}
          value={email} />

        <TextInput style={styles.inputs}
          placeholder='Digite uma senha forte:'
          onChangeText={setSenha}
          value={senha}
          secureTextEntry={true} />

        <TextInput style={styles.inputs}
          placeholder='Confirme sua senha:'
          onChangeText={setConfirmarSenha}
          value={confirmarSenha}
          secureTextEntry={true} />

        <Button title='Enviar cadastro' onPress={realizarCadastro} />
      </View>

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
  header: {
    backgroundColor: '#e5c7b6',
    padding: 20,
    marginBottom: '50'

  },
  inputs: {
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
  }

},
);
