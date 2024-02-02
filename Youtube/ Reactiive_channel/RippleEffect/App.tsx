import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import Ripple from './components/Ripple';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  const onTap = useCallback(() => {
    console.log('on tap');
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <Ripple style={styles.ripple} onTap={onTap}>
          <Text>Tap</Text>
        </Ripple>
      </View>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
  },
  ripple: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
});
