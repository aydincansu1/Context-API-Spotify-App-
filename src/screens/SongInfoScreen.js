import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function SongInfoScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {album} = route.params || {};

  return (
    <LinearGradient colors={['#040306', '#131624']} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons color="white" size={24} name="arrow-back" />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image source={{uri: album.coverArt}} style={styles.albumImage} />
          </View>
          <Text style={styles.albumName}>{album.name}</Text>
        </View>

        <Pressable style={styles.controlsContainer}>
          <Pressable style={styles.downloadButton}>
            <AntDesign name="arrowdown" color="white" size={20} />
          </Pressable>
          <View style={styles.actionButtons}>
            <FontAwesome name="random" size={24} color="#1db954" />
            <Pressable style={styles.playButton}>
              <Entypo name="controller-play" size={24} color="white" />
            </Pressable>
          </View>
        </Pressable>

        <View>
          <Pressable style={styles.artistContainer}>
            <View>
              <Text style={styles.artistName}>{'Album : ' + album.name}</Text>
              <View style={styles.yearContainer}>
                <Text style={styles.yearText}>
                  {'Artist : ' + album.artist}
                </Text>
                <Text style={styles.yearText}>
                  {'Year:' + (album.year ? album.year : ' yil verisi yok')}
                </Text>
              </View>
            </View>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginTop: 50,
    marginHorizontal: 15,
  },
  backButton: {
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  albumImage: {
    width: 200,
    height: 200,
  },
  albumName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

  tagText: {
    color: '#909090',
    fontWeight: '500',
    fontSize: 13,
  },
  controlsContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  downloadButton: {
    backgroundColor: '#1db954',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#1db954',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  artistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  artistName: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  yearContainer: {
    marginTop: 5,
    gap: 8,
  },
  yearText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});
