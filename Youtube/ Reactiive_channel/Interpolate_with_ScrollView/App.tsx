import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from './components/Page';
const Titles = ['whats', 'up', 'leute'];

const App = () => {
  const scrollX = useSharedValue(0);

  const scroll = useAnimatedScrollHandler(evt => {
    scrollX.value = evt.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      onScroll={scroll}
      scrollEventThrottle={16}>
      {Titles.map((title, index) => (
        <Page
          key={index.toString()}
          index={index}
          title={title}
          scrollX={scrollX}
        />
      ))}
    </Animated.ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({});
