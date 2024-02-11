import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import {screens} from '../navigation/Navigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Home = ({navigation}) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 100}}
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      {screens.map(screen => (
        <Pressable
          key={screen.name}
          style={styles.item}
          onPress={() => navigation.navigate(screen.name)}>
          <Text style={styles.title}>{screen.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {paddingHorizontal: 5, marginTop: 10},
  item: {
    marginVertical: 5,
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  title: {
    color: '#363636',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 18,
  },
});
