import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import React from 'react';
import {isTranslateY} from 'react-native-redash';

const Clock2 = ({progress, tr}) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${progress.value}rad`}, {translateY: -tr.value}],
    };
  });
  return (
    <Animated.View
      style={[
        {
          width: 50,
          height: 50,
          backgroundColor: 'yellow',
        },
        rStyle,
      ]}></Animated.View>
  );
};

export default Clock2;

const styles = StyleSheet.create({});
