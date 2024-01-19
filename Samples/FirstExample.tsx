/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// View Responder

const SIZE = 80;
import React, {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  withSpring,
  interpolate,
  withSequence,
  useAnimatedScrollHandler,
  withRepeat,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  const progress = useSharedValue(1);
  const touchX = useSharedValue(0);
  const touchY = useSharedValue(0);
  const scrollY = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {scale: progress.value},
      //{rotate: `${progress.value}rad`},
      {translateX: touchX.value},
      {translateY: touchY.value},
    ],
    backgroundColor: interpolateColor(
      progress.value,
      [1, 3],
      ['#00ff77', '#e516f8'],
    ),
    borderRadius: interpolate(progress.value, [1, 3], [0, SIZE / 2]),
    borderWidth: interpolate(progress.value, [1, 3], [0, 10]),
  }));

  const moveGesture = Gesture.Pan()
    .onUpdate(_evt => {
      touchX.value = _evt.translationX;
      touchY.value = _evt.translationY;
    })
    .onEnd(_evt => {
      touchX.value = withSpring(0);
      touchY.value = withSpring(0);
    });

  const scrollStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      scrollY.value,
      [-50, 0, 50],
      ['black', 'white', 'gray'],
    ),
  }));
  useEffect(() => {
    progress.value = withDelay(
      2000,
      withRepeat(withTiming(3, {duration: 500}), 6, true),
    );
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View
        style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}, ,]}>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={useAnimatedScrollHandler(evt => {
            scrollY.value = evt.contentOffset.y;
          })}
          style={[
            {
              width: '100%',
              height: '100%',
            },
            scrollStyles,
          ]}
          contentContainerStyle={[
            {
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            },
          ]}>
          <GestureDetector gesture={moveGesture}>
            <Animated.View
              style={[{width: SIZE, height: SIZE}, animatedStyles]}
            />
          </GestureDetector>
        </Animated.ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
export default App;
