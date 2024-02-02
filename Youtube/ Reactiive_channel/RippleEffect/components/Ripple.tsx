import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {Children, PropsWithChildren} from 'react';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  measure,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {opacity, translate} from 'react-native-redash';

interface RippleProps {
  style: StyleProp<ViewStyle>;
  onTap?: () => void;
  children: React.ReactElement<PropsWithChildren>;
}

const Ripple: React.FC<RippleProps> = ({style, onTap, children}) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const rippleOpacity = useSharedValue(0);

  const aRef = useAnimatedRef<View>();

  const tap = Gesture.Tap()
    .onStart(tapEvt => {
      const layout = measure(aRef);
      width.value = layout?.width;
      height.value = layout?.height;

      centerX.value = tapEvt.x;
      centerY.value = tapEvt.y;
      rippleOpacity.value = 1;
      scale.value = 0;
      scale.value = withTiming(1, {duration: 1000});
    })
    .onBegin(() => {
      runOnJS(onTap)();
    })
    .onFinalize(() => {
      rippleOpacity.value = withDelay(600, withTiming(0));
    });

  const rStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);
    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;

    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      backgroundColor: '#e3dfdf',
      borderRadius: circleRadius,
      position: 'absolute',
      top: 0,
      left: 0,

      opacity: rippleOpacity.value,
      transform: [{scale: scale.value}, {translateX}, {translateY}],
    };
  });
  return (
    <View ref={aRef} style={[style]}>
      <GestureDetector gesture={tap}>
        <Animated.View style={[style, {overflow: 'hidden'}]}>
          <View>{children}</View>
          <Animated.View style={rStyle} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default Ripple;

const styles = StyleSheet.create({});
