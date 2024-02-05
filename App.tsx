import {NavigationContainer} from '@react-navigation/native';
import Navigator from './navigation/Navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  </SafeAreaProvider>
);

export default App;
