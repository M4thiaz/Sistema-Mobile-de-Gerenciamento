import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image, Button, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Botao from '../components/Botao.jsx'
import InputUser from '../components/InputUser.jsx'
import LogoBROE from '../components/LogoBROE.jsx';
import { cores } from '../themes/cores.js';
import { radius } from '../themes/radius.js';
import { espacamento } from '../themes/espacamento.js';
import { tipografia } from '../themes/tipografia.js';

export default function Login() {
  const navigation = useNavigation();

  const [emailInput, setEmailInput] = useState('');
  const [senhaInput, setSenhaInput] = useState('');

  const redirect = () => {
    setEmailInput('')
    setSenhaInput('')
    navigation.navigate('Cadastro')
    
  };

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

    <LogoBROE/>

      <View>
        <InputUser
          setValue={setEmailInput}
          value={emailInput}
          placeholder={'Digite seu email:'}
        />
        <InputUser
          setValue={setSenhaInput}
          value={senhaInput}
          placeholder={'Digite a senha:'}
          seguranca={true}
        />

        <Botao
          title='Entrar'
          onPress={realizarLogin}
        />


        <TouchableOpacity onPress={redirect}>
          <Text style={styles.ctaCadastro}>
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
    backgroundColor: cores.fundo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaCadastro: {
    color: cores.txt,
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontFamily: tipografia.fonte1,
    fontSize: tipografia.pequeno,
    marginVertical: espacamento.xl
  }

});
