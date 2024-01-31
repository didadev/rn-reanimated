import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {TaskInterface} from '../App';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureType,
  PanGesture,
  PanGestureHandler,
  PanGestureHandlerProps,
  Swipeable,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {PanGestureType} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture';

interface ListItemProps {
  task: TaskInterface;
  onDismiss?: (index: number) => void;
  scrollRef: any;
}

const {width} = Dimensions.get('window');
const LIST_ITEM_HEIGHT = 70;
const TRANSLATEX_THRESHHOLD = -width * 0.3;

const ListItem: React.FC<ListItemProps> = props => {
  const translateX = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const listItemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const opacity = useSharedValue(1);

  const marginVertical = useSharedValue(10);

  const longPressGesture = Gesture.LongPress().onStart(() => {
    isDragging.value = true;
  });

  const panGesture = Gesture.Pan()
    // .manualActivation(true)
    // .onTouchesMove((evt, state) => {
    //   if (isDragging.value) {
    //     state.activate();
    //   } else {
    //     state.fail();
    //   }
    // })
    //.blocksExternalGesture(props.scrollRef)

    .onChange(evt => {
      if (evt.translationX < 0) {
        translateX.value = evt.translationX;
      } else {
        translateX.value = withTiming(0);
      }
    })
    .onEnd(() => {
      const shouldbeDismissed = translateX.value < TRANSLATEX_THRESHHOLD;
      if (shouldbeDismissed) {
        translateX.value = withTiming(-width - 10);
        listItemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, isFInished => {
          if (isFInished && props.onDismiss) {
            runOnJS(props.onDismiss)(props.task.index);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    })

    .onFinalize(() => {
      isDragging.value = false;
    })
    .simultaneousWithExternalGesture(props.scrollRef);
  // .simultaneousWithExternalGesture(longPressGesture);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = translateX.value > TRANSLATEX_THRESHHOLD ? 0 : 1;
    return {
      opacity: withTiming(opacity),
    };
  });

  const rListItemHeight = useAnimatedStyle(() => {
    return {
      height: withTiming(listItemHeight.value),
      marginVertical: withTiming(marginVertical.value),
      opacity: opacity.value,
    };
  });
  // <GestureDetector gesture={Gesture.Race(longPressGesture, panGesture)}>
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.taskContainer, rListItemHeight]}>
        <Animated.View style={[styles.deleteContainer, rIconContainerStyle]}>
          <Icon name="trash-alt" size={LIST_ITEM_HEIGHT * 0.4} color="red" />
        </Animated.View>
        <Animated.View style={[styles.taskContainer, rStyle]}>
          <View style={[styles.taskItem]}>
            <Text style={styles.taskTitle}>{props.task.title}</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  taskContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
  },
  taskItem: {
    width: '90%',
    height: LIST_ITEM_HEIGHT,

    backgroundColor: '#fff',
    paddingLeft: 20,
    justifyContent: 'center',
    borderRadius: 10,
    shadowOffset: {width: 1, height: 20},
    shadowOpacity: 0.07,
    shadowColor: '#000',
    shadowRadius: 3,
    elevation: 5,
  },
  taskTitle: {
    fontSize: 18,
  },
  deleteContainer: {
    position: 'absolute',
    right: '10%',
    top: 10,
    width: LIST_ITEM_HEIGHT,
    height: LIST_ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
