import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Cadastro from './src/screens/Cadastro';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SplashScreen({ navigation }) {
  useEffect(() => {
    async function inicializarApp() {
      const timerPromessa = new Promise((resolve) => setTimeout(resolve, 1000));
      const checarLogin = async function checarAutenticacao(){
        const token = await AsyncStorage.getItem('token');
        
        return token !=null
      };

      const [_, usuarioLogado] = await Promise.all([timerPromessa, checarLogin()]);

      if (usuarioLogado) {
        navigation.replace('MainTabs');
      } else {
        navigation.replace('Login');
      }
    }

    inicializarApp();
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Text style={styles.splashText}>Carregando...</Text>
    </View>
  );
}


function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#e5c7b6',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Sobre"
        component={Sobre}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="info" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#e5c7b6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000000',
  },
});