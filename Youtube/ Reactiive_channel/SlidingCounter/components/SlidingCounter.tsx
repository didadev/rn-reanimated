import {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';

const ICON_SIZE = 20;
const ICON_COLOR = '#fff';

const BUTTON_WIDTH = 170;
const BUTTON_HEIGHT = 70;
const MAX_SLIDE_OFFSET = BUTTON_WIDTH * 0.3;
const MAX_Y_OFFSET = BUTTON_HEIGHT;

const clamp = (value: number, min: number, max: number) => {
  'worklet';
  return Math.min(Math.max(value, min), max);
};
const SlidingCounter = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [counter, setCounter] = useState(0);

  const increment = useCallback(() => {
    setCounter(currentCounter => currentCounter + 1);
  }, []);
  const decrement = useCallback(() => {
    setCounter(currentCounter => currentCounter - 1);
  }, []);

  const clearCounter = useCallback(() => setCounter(0), []);

  const pan = Gesture.Pan()
    .onChange(evt => {
      translateX.value = clamp(
        evt.translationX,
        -MAX_SLIDE_OFFSET,
        MAX_SLIDE_OFFSET,
      );

      translateY.value = clamp(evt.translationY, 0, MAX_Y_OFFSET);
    })
    .onFinalize(() => {
      if (translateY.value === MAX_Y_OFFSET) {
        runOnJS(clearCounter)();
      } else if (translateX.value === MAX_SLIDE_OFFSET) {
        //increment();
        runOnJS(increment)();
      } else if (translateX.value === -MAX_SLIDE_OFFSET) {
        runOnJS(decrement)();
      }
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  const rMinusPlusIconStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
      [0.5, 1, 0.5],
    );

    const opacityY = interpolate(translateY.value, [0, MAX_Y_OFFSET], [1, 0]);
    return {
      opacity: opacityX * opacityY,
    };
  });

  const rClearIconStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateY.value, [0, MAX_Y_OFFSET], [0, 1]),
    };
  });

  const rBstyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value * 0.1},
      {translateY: translateY.value * 0.1},
    ],
  }));

  return (
    <Animated.View style={[styles.container, rBstyle]}>
      <Animated.View style={rMinusPlusIconStyle}>
        <Icon name="minus" size={ICON_SIZE} color={ICON_COLOR} />
      </Animated.View>
      <Animated.View style={rClearIconStyle}>
        <Icon name="close" size={ICON_SIZE} color={ICON_COLOR} />
      </Animated.View>
      <Animated.View style={rMinusPlusIconStyle}>
        <Icon name="plus" size={ICON_SIZE} color={ICON_COLOR} />
      </Animated.View>

      <View style={styles.circleContainer}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.circle, rStyle]}>
            <Text style={{color: '#fff'}}>{counter}</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </Animated.View>
  );
};

export default SlidingCounter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
