import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, createNativeStackScreen } from '@react-navigation/native-stack';
import { useState } from 'react';


export default function Cadastro() {

  const navigation = createNativeStackNavigator('');

  const [nameInput, SetNameInput] = useState('');
  const [emailInput, SetEmailInput] = useState('');
  const [passwordInput, SetPasswordInput] = useState('');

  const realizarCadastro = async ()=>{
    try{
      if(!nameInput || !emailInput || !passwordInput){
        console.log("Preencha os campos vazios!")

        const ListaCadastros = [{nome, email, senha}]
        
      }
    }
  }

  return (
    <View style={styles.container}>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
