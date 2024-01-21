import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ACCENT_COLOR, BORDER_COLOR, colors} from '../misc/colors';
import {messages} from '../misc/messages';
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const Message = props => {
  const {item, accent} = props;
  const messagesFromMe = messages.filter(msg => msg.from === 'me');
  console.log(messagesFromMe);
  const msgIndex = messagesFromMe.findIndex(msg => msg.id === item.id);

  const animatedBgColor = useAnimatedStyle(() => ({
    backgroundColor: withDelay(150 * msgIndex, withTiming(accent.value)),
  }));

  const AnimatedTextColor = useAnimatedStyle(() => ({
    color: withDelay(
      150 * msgIndex,

      isDarkColor(accent.value) ? withTiming('white') : withTiming('black'),
    ),
  }));
  return (
    <Animated.View
      style={[
        styles.message,

        item.from === 'me'
          ? [styles.messageMe, animatedBgColor]
          : styles.mesageThem,
      ]}>
      <Animated.Text
        style={[
          styles.messageText,

          item.from === 'me' ? AnimatedTextColor : {color: 'black'},
        ]}>
        {item.message}
      </Animated.Text>
    </Animated.View>
  );
};

export default Message;

const styles = StyleSheet.create({
  message: {
    marginVertical: 8,
    marginHorizontal: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 24,
  },
  messageMe: {alignSelf: 'flex-end', backgroundColor: ACCENT_COLOR},
  mesageThem: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER_COLOR,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
});

const isDarkColor = hex => {
  'worklet';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const hsp = Math.sqrt(0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2);
  return hsp < 170;
};
