import { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cores } from '../themes/cores';
import { tipografia } from '../themes/tipografia';
import { espacamento } from '../themes/espacamento';
import { radius } from '../themes/radius';
import Botao from '../components/Botao.jsx'
import InputUser from '../components/InputUser.jsx'
import LogoBROE from '../components/LogoBROE.jsx';
import { cadastrarUsuario } from '../services/storage.js';

export default function Cadastro() {

  const navigation = useNavigation();

  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [email, setEmail] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [estado, setEstado] = useState('')
  const [cargo, setCargo] = useState('')

  const realizarCadastro = async () => {
    try {

      if (!usuario || !email || !senha || !confirmarSenha || !estado || !cargo) {
        throw new Error("Por favor, preencha todos os campos.");
      }

      if (senha !== confirmarSenha) {
        throw new Error("As senhas não coincidem.");
      }

      if (senha.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres.")
      }

      await cadastrarUsuario(usuario, email, senha, estado, cargo)

      setUsuario('');
      setEmail('');
      setSenha('');
      setConfirmarSenha('');
      setEstado('');
      setCargo('');


      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!')

      navigation.navigate('Login')

    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível realizar seu cadastro.');
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={styles.container}>

      <ScrollView>
        
          <LogoBROE />

          <InputUser
            setValue={setUsuario}
            value={usuario}
            placeholder={'Qual é o seu nome?'}
          />
          <InputUser
            setValue={setEmail}
            value={email}
            placeholder={'Digite seu melhor email:'}
          />
          <InputUser
            setValue={setEstado}
            value={estado}
            placeholder={'Em que Estado reside?'}
          />
          <InputUser
            setValue={setCargo}
            value={cargo}
            placeholder={'Com oque costuma trabalhar? '}
          />
          <InputUser
            setValue={setSenha}
            value={senha}
            placeholder={'Digite uma senha forte:'}
            seguranca={true}
          />
          <InputUser
            setValue={setConfirmarSenha}
            value={confirmarSenha}
            placeholder={'Confirme a sua senha:'}
            seguranca={true}
          />

          <Botao
            onPress={realizarCadastro}
            title={'Confirmar Cadastro'}
          />

      </ScrollView>

    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    alignItems: 'center',
    justifyContent: 'center',
  },

},
);
