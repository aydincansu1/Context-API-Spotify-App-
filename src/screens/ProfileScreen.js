import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ProfileContext} from '../context/ProfileContext';
import round from 'lodash/round';
export default function ProfileScreen() {
  const {profiles} = useContext(ProfileContext);

  const profile = Array.isArray(profiles) ? profiles[0] : profiles;

  const {
    uri,
    name,
    image_url,
    followers_count,
    public_playlists,
    ownerName,
    ownerUri,
  } = profile || {};

  const formatImageUrl = imageUrl => {
    if (imageUrl && imageUrl.startsWith('spotify:image:')) {
      return `https://i.scdn.co/image/${imageUrl.replace(
        'spotify:image:',
        '',
      )}`;
    }
    return imageUrl; // Doğru formatta değilse, mevcut URL'yi döndür
  };

  const formatFollowers = count => {
    if (count >= 1000000) {
      return `${round(count / 1000000, 1)} M`;
    }
    if (count >= 1000) {
      return `${round(count / 1000, 1)} K`;
    }
  };
  return (
    <LinearGradient colors={['#040306', '#131624']} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <View style={styles.profileHeader}>
            <Image
              source={{uri: formatImageUrl(image_url)}}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.nameText}>{name}</Text>
              <Text style={styles.emailText}>
                {formatFollowers(followers_count)
                  ? `${formatFollowers(followers_count)} followers`
                  : 'No followers'}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.playlistTitle}>Your Playlist</Text>

        {public_playlists && public_playlists.length > 0 ? (
          public_playlists.map((playlist, index) => (
            <View key={index} style={styles.playlistItem}>
              <Image
                source={{uri: formatImageUrl(playlist.image_url)}}
                style={styles.playlistImage}
              />
              <View>
                <Text style={styles.playlistName}>{playlist.name}</Text>
                <Text style={styles.followersCount}>
                  {formatFollowers(playlist.followers_count)
                    ? `${formatFollowers(playlist.followers_count)} followers`
                    : 'No followers'}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noPlaylists}>No playlists available</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginTop: 60,
    marginHorizontal: 15,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  nameText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emailText: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playlistTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 12,
  },
  playlistItem: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playlistImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  playlistName: {
    color: 'white',
  },
  followersCount: {
    color: 'white',
  },
  noPlaylists: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
});
