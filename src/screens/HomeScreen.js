import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import ArtisitCard from '../components/ArtisitCard';
import {AlbumsContext} from '../context/AlbumsContext';
import AlbumCard from '../components/AlbumCard';
import Loader from '../components/Loader';
import Eror from '../components/Eror';
import {ArtistsContext} from '../context/ArtistContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const {
    albums,
    loading: albumsLoading,
    error: albumsError,
  } = useContext(AlbumsContext);
  const {
    artists,
    loading: artistsLoading,
    error: artistsError,
  } = useContext(ArtistsContext);

  return (
    <LinearGradient colors={['#040306', '#131624']} style={styles.container}>
      {albumsLoading ? (
        <Loader />
      ) : albumsError ? (
        <Eror error={albumsError} />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContentContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.userContainer}>
              <Image
                source={require('../image/user.jpeg')}
                style={styles.userImage}
              />
              <Text style={styles.userName}>message</Text>
            </View>
            <Entypo name="light-down" size={24} color="white" />
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Music</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Podcast & Shows</Text>
            </Pressable>
          </View>

          <View>
            <Pressable
              onPress={() => navigation.navigate('Liked')}
              style={styles.likedContainer}>
              <LinearGradient
                colors={['#33006f', '#ffff']}
                style={styles.gradient}>
                <Pressable style={styles.iconContainer}>
                  <AntDesign name="heart" size={24} color="white" />
                </Pressable>
              </LinearGradient>
              <Text style={styles.likedText}>Liked Songs</Text>
            </Pressable>

            <View style={styles.albumContainer}>
              <Image
                source={require('../image/aftersun.webp')}
                style={styles.albumImage}
              />
              <View>
                <Text style={styles.albumName}>Hippo</Text>
              </View>
            </View>

            {/* FlatList renderItem */}
            <Pressable style={styles.albumContainer}>
              <Image
                source={require('../image/aftersun.webp')}
                style={styles.albumImage}
              />
              <View>
                <Text style={styles.albumName}>name</Text>
              </View>
            </Pressable>

            <Text style={styles.topArtistsText}>Your Top Artists</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {artists?.map((artist, index) => (
                <ArtisitCard artist={artist} key={index} />
              ))}
            </ScrollView>

            <View style={styles.spacing} />
            <Text style={styles.popularAlbumsText}>Popular Albums</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator>
              {albums?.map((album, index) => (
                <AlbumCard album={album} key={index} />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
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
  scrollContentContainer: {
    paddingBottom: 100,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    gap: 10,
  },
  button: {
    backgroundColor: '#282828',
    padding: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  likedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    backgroundColor: '#202020',
    borderRadius: 4,
  },
  gradient: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likedText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  albumContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    backgroundColor: '#202020',
    borderRadius: 4,
  },
  albumImage: {
    width: 55,
    height: 55,
  },
  albumName: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  topArtistsText: {
    color: 'white',
    fontSize: 19,
    marginTop: 15,
    fontWeight: 'bold',
  },
  spacing: {
    height: 10,
  },
  popularAlbumsText: {
    fontSize: 19,
    color: 'white',
    fontWeight: 'bold',
  },
});
