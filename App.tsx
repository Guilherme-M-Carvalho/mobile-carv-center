import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View } from 'react-native';
import Routes from './src/routes';
import AuthProvider from './src/contexts/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GlobalAlertProvider from './src/contexts/GlobalAlertContext';
import { PaperProvider } from 'react-native-paper';
export default function App() {

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <GlobalAlertProvider>
          <AuthProvider>
            <NavigationContainer>
              <StatusBar backgroundColor={"#1d1d2e"} barStyle={"light-content"} translucent={false} />
                <Routes />
            </NavigationContainer>
          </AuthProvider>
        </GlobalAlertProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}