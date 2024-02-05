import {View, Text, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import React, {useCallback} from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const THRESHHOLD = SCREEN_WIDTH / 3;

const App = () => {
  const translateX = useSharedValue(0);

  const pan = Gesture.Pan()
    .onChange(evt => {
      translateX.value += evt.changeX;
    })
    .onFinalize(evt => {
      if (translateX.value < THRESHHOLD) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(SCREEN_WIDTH / 2);
      }
    });

  const rStyles = useAnimatedStyle(() => {
    const rotateY = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 3],
      Extrapolation.CLAMP,
    );
    const borderRadius = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 15],
      Extrapolation.CLAMP,
    );
    return {
      borderRadius,
      transform: [
        {perspective: 100},
        {translateX: translateX.value},
        {rotateY: `-${rotateY}deg`},
      ],
    };
  }, []);
  const toggleMenu = useCallback(() => {
    translateX.value === 0
      ? (translateX.value = withTiming(SCREEN_WIDTH / 2))
      : (translateX.value = withTiming(0));
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[{flex: 1, backgroundColor: 'white'}, rStyles]}>
            <Icon
              name="menu"
              style={{margin: 15}}
              size={30}
              color={BACKGROUND_COLOR}
              onPress={toggleMenu}
            />
          </Animated.View>
        </GestureDetector>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const BACKGROUND_COLOR = '#1e1e23';
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: BACKGROUND_COLOR,
  },
});
export default App;
