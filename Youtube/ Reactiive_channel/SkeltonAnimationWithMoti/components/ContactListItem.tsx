import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Skeleton} from 'moti/skeleton';

export type ContactInfo = {
  name: string;
  email: string;
};

type ContactListProps = {
  contact?: ContactInfo | null;
};

const commonSkeltonConfig = {
  colorMode: 'dark',
  transition: {type: 'timing', duration: 2000},
  //backgroundColor: '#e717ee85',
} as const;

const ContactListItem: React.FC<ContactListProps> = ({contact}) => {
  return (
    <View style={styles.container}>
      <Skeleton.Group show={contact === null}>
        <Skeleton width={70} height={70} radius={35} {...commonSkeltonConfig}>
          <View style={styles.avatarContainer}>
            <Text style={styles.firstLetter}>
              {contact?.name?.[0].toUpperCase()}
            </Text>
          </View>
        </Skeleton>
        <View style={styles.infosContainer}>
          <Skeleton height={40} width={'80%'} {...commonSkeltonConfig}>
            <Text style={styles.name}>{contact?.name}</Text>
          </Skeleton>
          <View style={styles.fieldsSeparator} />
          <Skeleton height={20} width={'70%'} {...commonSkeltonConfig}>
            <Text style={styles.email}>{contact?.email}</Text>
          </Skeleton>
        </View>
      </Skeleton.Group>
    </View>
  );
};

export default ContactListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffbb00',
  },
  avatarContainer: {
    height: 70,
    aspectRatio: 1,
    borderRadius: 35,
    backgroundColor: '#0055d5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstLetter: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  infosContainer: {
    marginLeft: 10,
  },

  name: {
    fontSize: 20,
  },
  fieldsSeparator: {
    height: 2,
  },
  email: {
    fontSize: 15,
  },
});
