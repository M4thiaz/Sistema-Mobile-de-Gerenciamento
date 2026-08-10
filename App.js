import { NavigationContainer } from '@react-navigation/native';
import StackRoute from './src/routes/StackRoute';

export default function App() {
  return (
    <NavigationContainer>
      <StackRoute/>
    </NavigationContainer>
  );
}
