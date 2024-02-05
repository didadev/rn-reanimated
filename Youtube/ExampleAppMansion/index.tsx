import {Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Chat from './Screens/Chats';
import {ACCENT_COLOR, BACKDROP_COLOR, BACKGROUND_COLOR} from './misc/colors';
import {useState} from 'react';
import {HEIGHT, OVERDRAG} from './misc/consts';
import AccentPicker from './Components/AccentPicker';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const App = () => {
  const offset = useSharedValue(0);
  const [isOpen, setOpen] = useState(false);
  const accentColor = useSharedValue(ACCENT_COLOR);

  const toggleSheet = () => {
    setOpen(!isOpen);
    offset.value = 0;
  };
  const translateY = useAnimatedStyle(() => ({
    transform: [{translateY: offset.value}],
  }));

  const pan = Gesture.Pan()
    .onChange(e => {
      const offsetDelta = offset.value + e.changeY;

      const clamp = Math.max(-OVERDRAG, offsetDelta);

      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
      //offset.value += e.changeY;
    })
    .onFinalize(e => {
      if (offset.value < HEIGHT / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(HEIGHT, {}, () => {
          runOnJS(toggleSheet)();
        });
      }
    });
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <Chat accent={accentColor} toggleSheet={toggleSheet} />
        {isOpen && (
          <>
            <AnimatedPressable
              style={styles.backdrop}
              onPress={toggleSheet}
              entering={FadeIn}
              exiting={FadeOut}>
              <GestureDetector gesture={pan}>
                <Animated.View
                  style={[styles.sheet, translateY]}
                  entering={SlideInDown.springify().damping(15)}
                  exiting={SlideOutDown}>
                  <AccentPicker
                    onPick={color => {
                      accentColor.value = color;
                      toggleSheet();
                    }}
                  />
                </Animated.View>
              </GestureDetector>
            </AnimatedPressable>
          </>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BACKDROP_COLOR,
    zIndex: 1,
  },
  sheet: {
    backgroundColor: 'white',
    height: HEIGHT,
    width: '100%',
    position: 'absolute',
    bottom: -OVERDRAG * 1.1,
    padding: 16,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },
});
