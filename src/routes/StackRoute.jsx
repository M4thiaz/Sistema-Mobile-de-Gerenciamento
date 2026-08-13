import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Cadastro from '../screens/Cadastro';
import Login from '../screens/Login';
import TabRoutes from './TabRoute';
import SplashScreen from "../components/SplashScreen";
import UsuarioDetalhes from "../screens/Users/UsuarioDetalhes";
import EditarUsuario from "../screens/Users/EditarUsuario";
import CadastrarProduto from "../screens/Products/CadastrarProduto";
import EditarProduto from "../screens/Products/EditarProduto";
import ProdutoDetalhes from "../screens/Products/ProdutoDetalhes";

const Stack = createNativeStackNavigator();

export default function StackRoute() {
    return (
        <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen
                name="SplashScreen"
                component={SplashScreen} />

            <Stack.Screen
                name="Login"
                component={Login} />

            <Stack.Screen
                name="Cadastro"
                component={Cadastro} />

            <Stack.Screen
                name="TabRoutes"
                component={TabRoutes} />

            <Stack.Screen
                name="UsuarioDetalhes"
                component={UsuarioDetalhes} />
  
            <Stack.Screen
                name="EditarUsuario"
                component={EditarUsuario}
            />
            
            <Stack.Screen
                name="CadastrarProduto"
                component={CadastrarProduto}
            />
            
            <Stack.Screen
                name="EditarProduto"
                component={EditarProduto}
            />
            
            <Stack.Screen
                name="ProdutoDetalhes"
                component={ProdutoDetalhes}
            />

        </Stack.Navigator>
    );
}