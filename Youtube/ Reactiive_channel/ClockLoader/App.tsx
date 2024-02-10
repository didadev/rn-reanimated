import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {N} from './constants';
import Square from './components/Clock';

import {
  useSharedValue,
  withTiming,
  Easing,
  withRepeat,
  withDelay,
} from 'react-native-reanimated';
import {useEffect} from 'react';

const {width, height} = Dimensions.get('window');

const App = () => {
  const progress = useSharedValue(0);
  const tr = useSharedValue(0);

  useEffect(() => {
    const animate = () => {
      progress.value = withRepeat(
        withTiming(4 * Math.PI, {
          duration: 8000,
          easing: Easing.linear,
        }),
        -1,
      );
    };
    animate();
  });
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            width,
            height: 2,
            backgroundColor: 'red',
            transform: [{translateY: 10}],
          }}></View>
        <View style={styles.container}>
          {new Array(12).fill(0).map((_, index) => (
            <Square key={index} progress={progress} index={index} />
          ))}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
