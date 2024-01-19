import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Chat from './Screens/Chats';
import {ACCENT_COLOR, BACKDROP_COLOR, BACKGROUND_COLOR} from './misc/colors';
import {useState} from 'react';
import {HEIGHT, OVERDRAG} from './misc/consts';
import AccentPicker from './Components/AccentPicker';

const App = () => {
  const [isOpen, setOpen] = useState(false);
  const [accent, setAccent] = useState(ACCENT_COLOR);

  const toggleSheet = () => setOpen(!isOpen);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <Chat accent={accent} toggleSheet={toggleSheet} />
        {isOpen && (
          <>
            <Pressable style={styles.backdrop} onPress={toggleSheet}>
              <View style={styles.sheet}>
                <AccentPicker
                  onPick={color => {
                    console.log('picked');
                    setAccent(color);
                    toggleSheet();
                  }}
                />
              </View>
            </Pressable>
          </>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BACKDROP_COLOR,
    zIndex: 1,
  },
  sheet: {
    backgroundColor: 'white',
    height: HEIGHT,
    width: '100%',
    position: 'absolute',
    bottom: -OVERDRAG * 1.1,
    padding: 16,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },
});
