import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {N, SQUARE_SIZE} from '../constants';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface SquareProps {
  index: number;
  progress: SharedValue<number>;
}

const Square: React.FC<SquareProps> = ({index, progress}) => {
  const offsetAngle = (2 * Math.PI) / N;
  const finalAngle = offsetAngle * (N - 1 - index);

  const rotate = useDerivedValue(() => {
    if (progress.value <= 2 * Math.PI) {
      return Math.min(progress.value, finalAngle);
    } else if (progress.value - 2 * Math.PI < finalAngle) {
      return finalAngle;
    }
    return progress.value;
  }, []);

  const translateY = useDerivedValue(() => {
    if (rotate.value === finalAngle) {
      return withSpring(-N * SQUARE_SIZE);
    }
    if (progress.value > 2 * Math.PI) {
      return withTiming((index - N) * SQUARE_SIZE);
    } else {
      return withTiming(-index * SQUARE_SIZE);
    }
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: `${rotate.value}rad`},
        {translateY: translateY.value},
      ],
    };
  });
  return (
    <Animated.View
      style={[
        styles.clock,
        {
          //opacity: (1 + index) / N,
        },
        rStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  clock: {
    width: SQUARE_SIZE,
    aspectRatio: 1,
    backgroundColor: '#fff',
    position: 'absolute',
  },
});

export default Square;
