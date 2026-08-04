import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image, Button, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation();

  const [emailInput, setEmailInput] = useState('');
  const [senhaInput, setSenhaInput] = useState('');

  const realizarLogin = async () => {
    if (!senhaInput || !emailInput) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const dadosSalvos = await AsyncStorage.getItem('UsuariosCadastrados');

      if (dadosSalvos !== null) {
        const listaUsuario = JSON.parse(dadosSalvos);

        const loginValido = listaUsuario.find(i => i.email === emailInput && i.senha === senhaInput);

        if (loginValido) {
          Alert.alert('Login Encontrado!');
          navigation.replace('Main');
        } else {
          throw new Error('Usuário ou senha incorretos.');
        }

      } else {
        Alert.alert('Erro', 'Nenhum usuário cadastrado neste dispositivo.');
      }
    } catch (error) {
      Alert.alert('Erro', error.message || 'Falha ao ler dados de autenticação.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.img}
          source={require('../assets/img/LogoBROE.png')}
        />
      </View>

      <View style={{gap: 30}}>
        <TextInput
          style={styles.inputs}
          placeholder='Digite seu Email:'
          onChangeText={setEmailInput}
          value={emailInput}
        />

        <TextInput
          style={styles.inputs}
          placeholder='Digite sua senha:'
          secureTextEntry={true}
          onChangeText={setSenhaInput}
          value={senhaInput}
        />
        
        <TouchableOpacity 
        style={styles.btnEntrar}
        onPress={realizarLogin}>
        <Text style={{textDecorationLine:'underline', fontFamily:'sans-serif-condensed', textAlign:'center', fontSize:18,}}>
          Entrar
        </Text>
        </TouchableOpacity>
        

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={{ color: 'blue', textDecorationLine: 'underline', fontFamily: 'sans-serif-condensed', fontSize: 18, }}>
            Não tem Conta? Crie uma agora mesmo!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    padding: 40,
    bottom: '8%'
  },
  inputs: {
    borderBottomWidth: 2,
    borderColor:'#25d89d',
    fontFamily: 'sans-serif-condensed',
    textAlign: 'start'

  },
  img: {
    width: 320,
    height: 150,
    
  },
  btnEntrar:{ 
    alignSelf: 'center',
    width: 100,
    borderRadius: 50,
    padding: 8,
    backgroundColor: '#F59E0B'
  }

});
