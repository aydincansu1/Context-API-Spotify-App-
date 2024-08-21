import {View, Text} from 'react-native';
import React from 'react';

export default function Eror({albumsError}) {
  return (
    <View>
      <Text>{albumsError.message}</Text>
    </View>
  );
}
