import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackScreen } from '@react-navigation/native-stack';


export default function Login({navigation}) {

// adicionar Imagem logo splashScreen

  return (
    <View style={styles.container}>
      <Text style={{fontSize:50, color:"#ffffff"}}>
        Aplicação principal 
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffbebe',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
