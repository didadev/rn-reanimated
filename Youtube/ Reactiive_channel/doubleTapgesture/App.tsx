import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import {useRef} from 'react';

const App = () => {
  const scale = useSharedValue(0);
  const tortuleOpacity = useSharedValue(1);

  const rScale = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const rTortuleStyle = useAnimatedStyle(() => ({
    opacity: tortuleOpacity.value,
  }));
  const singleTap = Gesture.Tap()
    .maxDuration(250)

    .onStart(evt => {
      tortuleOpacity.value = withTiming(0, undefined, isFinished => {
        if (isFinished) {
          tortuleOpacity.value = withDelay(500, withTiming(1));
        }
      });
    });

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(evt => {
      scale.value = withSpring(1, undefined, isFinished => {
        if (isFinished) {
          scale.value = withDelay(500, withTiming(0));
        }
      });
    });

  const tapGesture = Gesture.Exclusive(doubleTap, singleTap);
  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={tapGesture}>
        <View>
          <ImageBackground
            style={styles.image}
            source={require('../../../assets/images/double-tap.jpeg')}>
            <Animated.Image
              style={[styles.heart, rScale]}
              source={require('../../../assets/images/heart.png')}
            />
          </ImageBackground>
          <Animated.Text style={[styles.tortules, rTortuleStyle]}>
            🐢🐢🐢🐢🐢
          </Animated.Text>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default App;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  image: {width, height: 300, justifyContent: 'center', alignItems: 'center'},
  heart: {
    width: 100,
    height: 100,
    shadowColor: '#aa1c9c',
    shadowOpacity: 0.4,
    shadowOffset: {width: 10, height: 2},
    shadowRadius: 10,
  },
  tortules: {fontSize: 40, textAlign: 'center', marginTop: 30},
});
