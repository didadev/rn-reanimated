import {StyleSheet, View, Dimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
  PanGesture,
} from 'react-native-gesture-handler';

const imageURI =
  'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80';

const {width, height} = Dimensions.get('window');

const App = () => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const pinchGesture = Gesture.Pinch()
    .onUpdate(evt => {
      scale.value = evt.scale;
      focalX.value = evt.focalX;
      focalY.value = evt.focalY;
    })
    .onFinalize(() => {
      scale.value = withTiming(1);
    });
  const imageRStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: focalX.value},
      {translateY: focalY.value},
      {translateX: -width / 2},
      {translateY: -height / 2},
      {scale: scale.value},
      {translateX: -focalX.value},
      {translateY: -focalY.value},
      {translateX: width / 2},
      {translateY: height / 2},
    ],
  }));

  const focalPointRStyle = useAnimatedStyle(() => ({
    transform: [{translateX: focalX.value}, {translateY: focalY.value}],
  }));
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GestureDetector gesture={pinchGesture}>
        <Animated.View style={{flex: 1}}>
          <Animated.Image
            source={{uri: imageURI}}
            style={[styles.image, imageRStyle]}
          />
          <Animated.View style={[styles.focalPoint, focalPointRStyle]} />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  image: {flex: 1},
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: 'green',
    borderRadius: 10,
  },
});
