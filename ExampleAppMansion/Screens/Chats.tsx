import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowLeftIcon from '../Icons/ArrowLeftIcon';
import {BORDER_COLOR, PRIMARY_COLOR} from '../misc/colors';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import SettingsIcon from '../Icons/SettingsIcon';
import {messages} from '../misc/messages';
import Message from '../Components/Message';
import MicrophoneIcon from '../Icons/MicrophoneIcon';
import SendIcon from '../Icons/SendIcon';
const Chats = props => {
  const {toggleSheet, accent} = props;

  return (
    <>
      <SafeAreaView style={styles.headerContainer} edges={['top']}>
        <View style={styles.wrapper}>
          <ArrowLeftIcon />
          <Text style={styles.title}>Casper</Text>
          <TouchableOpacity onPress={toggleSheet}>
            <SettingsIcon />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <FlatList
        data={messages}
        renderItem={({item}) => <Message item={item} accent={accent} />}
        keyExtractor={item => item.id}
      />
      <SafeAreaView style={styles.footerContainer} edges={['bottom']}>
        <View style={styles.wrapper}>
          <MicrophoneIcon />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>Message</Text>
          </View>
          <SendIcon />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Chats;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER_COLOR,
  },
  wrapper: {
    flexDirection: 'row',

    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  footerContainer: {
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER_COLOR,
  },
  textWrappper: {},
  text: {},
});
