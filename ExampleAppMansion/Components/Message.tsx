import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ACCENT_COLOR, BORDER_COLOR} from '../misc/colors';

const Message = props => {
  const {item, accent} = props;
  return (
    <View
      style={[
        styles.message,
        item.from === 'me'
          ? [styles.messageMe, {backgroundColor: accent}]
          : styles.mesageThem,
      ]}>
      <Text
        style={[
          styles.messageText,
          {
            color:
              item.from === 'me'
                ? isDarkColor(accent)
                  ? 'white'
                  : 'black'
                : 'black',
          },
        ]}>
        {item.message}
      </Text>
    </View>
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
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const hsp = Math.sqrt(0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2);
  return hsp < 170;
};
