import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface Props {
  index: number;
  title: string;
  scrollX: SharedValue<number>;
}

const {width, height} = Dimensions.get('window');
const SIZE = width * 0.7;

const Page: React.FC<Props> = props => {
  const {index, title, scrollX} = props;

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const shapeAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    );

    const borderRadius = interpolate(
      scrollX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolation.CLAMP,
    );
    return {
      transform: [
        {
          scale,
        },
      ],
      borderRadius,
    };
  });

  const translateStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(scrollX.value, inputRange, [
          height / 2,
          0,
          -height / 2,
        ]),
      },
    ],
    opacity: interpolate(scrollX.value, inputRange, [0, 1, 0]),
  }));
  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: `rgba(20,10,220, 0.${index + 2})`},
      ]}>
      <Animated.View style={[styles.shape, shapeAnimatedStyle]}>
        <Animated.View style={[styles.titleContainer, translateStyle]}>
          <Text style={styles.title}>{title}</Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {width, height, justifyContent: 'center', alignItems: 'center'},
  shape: {
    width: SIZE,
    height: SIZE,
    backgroundColor: '#6a3fce',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {position: 'absolute'},
  title: {
    fontSize: 70,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});
