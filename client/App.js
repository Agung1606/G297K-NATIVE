import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  useFonts,
  Itim_400Regular,
} from '@expo-google-fonts/itim';

import Toast, { ErrorToast } from 'react-native-toast-message';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from './state';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://192.168.0.106:6002/graphql',
  cache: new InMemoryCache(),
})

const Stack = createNativeStackNavigator();

import Main from './Main';

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
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name='Main' component={Main} />
            </Stack.Navigator>
          </NavigationContainer>
          <Toast config={toastConfig} />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}
