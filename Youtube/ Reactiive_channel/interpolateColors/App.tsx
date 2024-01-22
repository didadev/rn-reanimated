import {StyleSheet, Text, View, Dimensions, Switch} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Theme = {
  light: {
    background: '#eee',
    circle: '#fff',
    text: '#000',
  },
  dark: {
    background: '#606060',
    circle: '#000000',
    text: '#ffffff',
  },
};

const SWITCH_TRACK_COLOR = {true: '#df14f1', false: '#050505'};

const AnimatedSwitch = Animated.createAnimatedComponent(Switch);
const {width, height} = Dimensions.get('window');
const SIZE = width * 0.7;

type THEME = 'light' | 'dark';
const App = () => {
  const [theme, setTheme] = useState<THEME>('light');
  const progress = useDerivedValue(() => {
    return theme === 'light' ? 0 : 1;
  }, [theme]);

  const inputRange = [0, 1];

  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      interpolateColor(progress.value, inputRange, [
        Theme.light.background,
        Theme.dark.background,
      ]),
    ),
  }));

  const circleStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      interpolateColor(progress.value, inputRange, [
        Theme.light.circle,
        Theme.dark.circle,
      ]),
    ),
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: withTiming(
      interpolateColor(progress.value, inputRange, [
        Theme.light.text,
        Theme.dark.text,
      ]),
    ),
  }));

  return (
    <Animated.View style={[styles.container, bgStyle]}>
      <Animated.Text style={[styles.themeText, textStyle]}>Theme</Animated.Text>
      <Animated.View style={[styles.circleView, circleStyle]}>
        <Switch
          thumbColor={'violet'}
          trackColor={SWITCH_TRACK_COLOR}
          value={theme === 'dark'}
          onValueChange={toggle => {
            setTheme(toggle ? 'dark' : 'light');
          }}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeText: {
    fontSize: 70,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 5,
    marginBottom: 20,
  },
  circleView: {
    width: SIZE,
    aspectRatio: 1,
    borderRadius: SIZE / 2,
    backgroundColor: '#fff',
    shadowColor: '#c0bdbd',
    shadowOffset: {width: 0, height: 25},
    shadowRadius: 10,
    shadowOpacity: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
