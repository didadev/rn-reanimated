import {
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {type} from 'os';

const BottomSheet = () => {
  const {height} = useWindowDimensions();
  const sheetHeight = useSharedValue(height);

  const bottomSheetanimatedStyles = useAnimatedStyle(() => ({
    top: sheetHeight.value,
  }));

  const handleSheetOpen = () => {
    sheetHeight.value = withSpring(height - height / 2 + 100);
  };
  const panGesture = Gesture.Pan()

    .onChange(_evt => {
      if (sheetHeight.value + _evt.changeY > height / 2 + 50) {
        sheetHeight.value = sheetHeight.value + _evt.changeY;
      } else {
      }
    })
    .onEnd(_evt => {
      if (sheetHeight.value > height / 2 + 200) {
        sheetHeight.value = withSpring(height);
      } else {
        sheetHeight.value = withSpring(height / 2 + 100);
      }
    });
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <Pressable onPress={handleSheetOpen} style={styles.button}>
          <Text style={styles.buttonText}>Open Sheet</Text>
        </Pressable>
      </View>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.bottomSheet,
            bottomSheetanimatedStyles,
          ]}></Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  button: {
    paddingHorizontal: 50,
    paddingVertical: 20,
    backgroundColor: '#0e4f91',
  },
  buttonText: {color: '#fff'},
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#00bbff',
    //borderTopWidth: 3,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: '##d7fc1d',
    shadowOffset: {height: -5, width: 0},
    elevation: 5,
    zIndex: 999,
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
