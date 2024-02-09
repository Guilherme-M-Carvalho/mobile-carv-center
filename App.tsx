import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View } from 'react-native';
import Routes from './src/routes';
import AuthProvider, { AuthContext } from './src/contexts/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GlobalAlertProvider from './src/contexts/GlobalAlertContext';
import { PaperProvider } from 'react-native-paper';
import { useContext } from 'react';
export default function App() {

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <GlobalAlertProvider>
          <AuthProvider>
            <NavigationContainer>
              <Status />
              <Routes />
            </NavigationContainer>
          </AuthProvider>
        </GlobalAlertProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

function Status() {
  
  const { isAuthenticated } = useContext(AuthContext)

  return (<StatusBar backgroundColor={isAuthenticated ? "#1B1C1F" : "#1d1d2e"} barStyle={"light-content"} translucent={false} />)
}