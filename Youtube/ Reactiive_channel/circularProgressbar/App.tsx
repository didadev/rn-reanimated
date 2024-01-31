import {Children, useCallback, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';

import Svg, {Circle} from 'react-native-svg';

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const {height, width} = Dimensions.get('window');

const CIRCLE_LENGTH = 1000; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const App = () => {
  const progress = useSharedValue(0);

  const animatedProp = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  useEffect(() => {
    //progress.value = withTiming(1, {duration: 2000});
  }, []);

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  const onStart = useCallback(() => {
    if (progress.value > 0) {
      progress.value = 0;
    }
    progress.value = withTiming(1, {duration: 10000});

    //progress.value = withTiming(progress.value > 0 ? 0 : 1, {duration: 10000});
  }, []);
  return (
    <View style={styles.container}>
      <ReText style={styles.counter} text={progressText}></ReText>
      <Svg style={{position: 'absolute'}}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
          fill={'transparent'}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          fill={'transparent'}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProp}
          strokeLinecap="round"
        />
      </Svg>
      <TouchableOpacity onPress={onStart} style={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  counter: {
    fontSize: 100,
    color: '#fff',
    width: 200,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 80,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    width: width * 0.7,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textTransform: 'uppercase',
    letterSpacing: 5,
    fontWeight: '700',
  },
});
