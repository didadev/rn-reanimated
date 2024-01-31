import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import ListItem from './components/ListItem';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {useCallback, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome6';

const TITLES = [
  'Lorem ipsum dolor sit amet',
  'ipsum doplkd',
  'ipsum dolor sit',
  'sit amet consectetur',
  'sit amet Sit, incidunt',
  'sit amet consectetur adipisicing',
];

export interface TaskInterface {
  title: string;
  index: number;
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({title, index}));

const BACKGROUND_COLOR = '#fAfBFF';

const App = () => {
  const [tasks, setTasks] = useState(TASKS);

  const onDismiss = (index: number) => {
    setTasks(newTasks => newTasks.filter(task => index !== task.index));
    // console.log(tasks.length);
  };

  let scrollRef = useRef();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Tasks</Text>

        <ScrollView style={{flex: 1}} ref={scrollRef}>
          {tasks.map(task => (
            <ListItem
              key={task.index}
              task={task}
              onDismiss={onDismiss}
              scrollRef={scrollRef}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 20,
    paddingLeft: '5%',
  },
});
