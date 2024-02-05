import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {PRIMARY_COLOR, colors} from '../misc/colors';

import {HEIGHT} from '../misc/consts';

const {width: windowWidth} = Dimensions.get('window');
const gap = 10;

const AccentPicker = ({onPick}) => {
  return (
    <>
      <Text style={styles.label}>Choose Accent </Text>
      <View style={styles.container}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.swatch, {backgroundColor: color}]}
            onPress={() => onPick(color)}
          />
        ))}
      </View>
    </>
  );
};

export default AccentPicker;

const styles = StyleSheet.create({
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: PRIMARY_COLOR,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: gap,
    flex: 1,
    height: HEIGHT / 2,
  },
  swatch: {
    width: 30,
    height: (windowWidth - 10 * gap) / 7,
    borderRadius: 4,
    aspectRatio: 1,
  },
});
