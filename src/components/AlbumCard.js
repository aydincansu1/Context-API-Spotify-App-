import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const AlbumCard = ({album}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Info', {album})}
      style={styles.albumContainer}>
      <Image source={{uri: album.coverArt}} style={styles.albumImage} />
      <Text numberOfLines={1} style={styles.albumName}>
        {album.name}
      </Text>
      <Text numberOfLines={1} style={styles.albumArtist}>
        {album.artist}
      </Text>
    </TouchableOpacity>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({
  albumContainer: {
    width: 100,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  albumImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  albumName: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 10,
  },
  albumArtist: {
    color: 'gray',
    fontSize: 13,
    fontWeight: '500',
  },
});
