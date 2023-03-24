import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  useFonts,
  Itim_400Regular,
} from '@expo-google-fonts/itim';

import Toast, { ErrorToast } from 'react-native-toast-message';

import { Provider } from 'react-redux';
import { store } from './state';

import SignIn from './screens/auth/signIn/SignIn';
import FlowRegister from './screens/auth/signUp/FlowRegister';
import MainLayout from './screens/layout/MainLayout';

const Stack = createNativeStackNavigator();

const toastConfig = {
  // overwrite error
  error: (props) => (
    <ErrorToast 
      {...props}
      style={{ borderLeftColor: 'red', width: 245, height: 50 }}
      text1Style={{
        fontSize: 15,
        textAlign: 'center'
      }}
    />
  ),
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Itim_400Regular,
  });
  if(!fontsLoaded) return null;

  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Group>
              <Stack.Screen name='SignIn' component={SignIn} />
              <Stack.Screen name='FlowRegister' component={FlowRegister} />
            </Stack.Group>
            
            <Stack.Screen name='MainLayout' component={MainLayout} />
            
          </Stack.Navigator>
        </NavigationContainer>
        <Toast config={toastConfig} />
    </Provider>
  );
}
