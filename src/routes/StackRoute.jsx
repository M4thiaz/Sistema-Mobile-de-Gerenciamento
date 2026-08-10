import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Cadastro from '../screens/Cadastro';
import Login from '../screens/Login';
import TabRoutes from './TabRoute';
import SplashScreen from "../components/SplashScreen";

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
        </Stack.Navigator>
    );
}