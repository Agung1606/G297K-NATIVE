import { NavigationContainer } from '@react-navigation/native';
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

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { API_URL } from '@env'

const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
})

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

          <GestureHandlerRootView className='flex-1'>
            <BottomSheetModalProvider>
              <NavigationContainer>
                <Main />
              </NavigationContainer>
            </BottomSheetModalProvider>
            <Toast config={toastConfig} />
          </GestureHandlerRootView>

        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}
