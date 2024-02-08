import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SlidingCounter from './components/SlidingCounter';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <SlidingCounter />
      </GestureHandlerRootView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
