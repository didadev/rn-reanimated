import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import {useCallback, useEffect, useState} from 'react';
import ContactListItem, {ContactInfo} from './components/ContactListItem';

const App = () => {
  const [contacts, setContacts] = useState<ContactInfo[] | null>();
  const contactsPlaceHolder = useMemo(() => {
    return Array.from({length: 15}).map(_ => null);
  }, []);
  const fetchUsers = useCallback(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();

    setContacts(data);
  }, []);

  useEffect(() => {
    fetchUsers();
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts ?? contactsPlaceHolder}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => <ContactListItem contact={item} />}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#00000074',
  },
});
