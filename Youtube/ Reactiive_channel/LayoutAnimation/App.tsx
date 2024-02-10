import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import ListItem from '../SwipeToDeleteAnimation/components/ListItem';
import {useCallback, useEffect, useRef, useState} from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

interface Item {
  id: number;
}

const LIST_ITEM_BACKGROUND = '#13a08d';

const items: Item[] = new Array(5).fill(0).map((_, index) => ({id: index}));

const App = () => {
  const [listItems, setListItems] = useState<Item[]>(items);
  // const [listItems, setListItems] = useState<Item[]>([]);
  const initialMode = useRef<boolean>(true);
  useEffect(() => {
    initialMode.current = false;
  }, []);
  const addItem = useCallback(() => {
    setListItems(currentListItems => {
      const itemID =
        (currentListItems[currentListItems.length - 1]?.id ?? 0) + 1;
      return [...currentListItems, {id: itemID}];
    });
  }, []);

  const removeItem = useCallback(id => {
    setListItems(currentItems => currentItems.filter(item => item.id !== id));
  });
  return (
    <>
      <TouchableOpacity style={styles.floating} onPress={addItem}>
        <Icon name="plus" color="white" size={40} />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        {listItems.map((item, index) => (
          <Animated.View
            key={item.id}
            style={styles.listItem}
            entering={initialMode.current ? FadeIn.delay(index * 100) : FadeIn}
            exiting={FadeOut}
            onTouchEnd={() => removeItem(item.id)}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1},
  listItem: {
    width: '90%',
    height: 100,
    marginVertical: 10,
    backgroundColor: LIST_ITEM_BACKGROUND,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 5,
    shadowOpacity: 0.5,
    shadowOffset: {height: 10, width: 0},
    shadowColor: '#383737',
    shadowRadius: 5,
  },
  floating: {
    width: 80,
    aspectRatio: 1,
    borderRadius: 40,
    backgroundColor: 'black',
    position: 'absolute',
    zIndex: 100,
    right: 20,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
