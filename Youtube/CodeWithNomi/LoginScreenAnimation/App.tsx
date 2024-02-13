import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signin from './Screens/Signin';
import Signup from './Screens/Signup';
import React from 'react';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="signin" component={Signin} />
      <Stack.Screen name="signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default App;
