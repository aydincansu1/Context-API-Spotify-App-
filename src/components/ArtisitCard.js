import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const ArtisitCard = ({artist}) => {
  return (
    <TouchableOpacity style={styles.artistContainer}>
      <Image source={{uri: artist.avatarImage}} style={styles.artistImage} />
      <Text numberOfLines={1} style={styles.artistName}>
        {artist.profile}
      </Text>
    </TouchableOpacity>
  );
};

export default ArtisitCard;

const styles = StyleSheet.create({
  artistContainer: {
    width: 100,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  artistName: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 7,
  },
  albumArtist: {
    color: 'gray',
    fontSize: 13,
    fontWeight: '500',
  },
});
