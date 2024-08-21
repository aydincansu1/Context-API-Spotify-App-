import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import TrackPlayer, {useProgress} from 'react-native-track-player';

export default function LikedSongScreen() {
  const navigation = useNavigation();
  const progress = useProgress();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('Türkiye de Popüler Müzikler');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const handleSearch = async () => {
    const options = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/search',
      params: {
        term: searchText,
        locale: 'tr-TR',
        offset: '0',
        limit: '5',
      },
      headers: {
        'x-rapidapi-key': 'cfeb32209cmshafa7ce3e8d7ffa5p13348fjsn9470e48eb1a1',
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setSearchedTracks(response.data.tracks.hits);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  const handlePlay = async track => {
    const trackData = {
      id: track.track.key,
      url: track.track.hub.actions.find(action => action.type === 'uri')?.uri,
      title: track.track.title,
      artist: track.track.subtitle,
      artwork: track.track.images.coverart,
    };

    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(trackData);
      await TrackPlayer.play();
      setSelectedTrack(track.track);
      setModalVisible(true);
      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_SEEK_TO,
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalPress = async () => {
    setModalVisible(false);
  };
  const togglePlay = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  //* Oynatılan müziği 10 saniye positiona göre geri aldık
  // Geri sarma işlevi
  const seekBackward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - 10);
  };

  // İleri sarma işlevi
  const seekForward = async () => {
    try {
      const position = await TrackPlayer.getPosition();
      await TrackPlayer.seekTo(position + 10);
    } catch (error) {
      console.error('İleri sarma hatası:', error);
    }
  };

  useEffect(() => {
    setupPlayer();
    handleSearch();
  }, []);

  return (
    <>
      <LinearGradient colors={['#614385', '#516395']} style={styles.gradient}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerContainer}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>

            <Pressable style={styles.searchBox}>
              <AntDesign name="search1" color="white" size={20} />
              <TextInput
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
                placeholderTextColor="white"
                placeholder="Find in Liked songs"
                style={styles.searchInput}
              />
            </Pressable>
          </View>

          <View style={styles.header}>
            <Text style={styles.headerTitle}>Liked songs</Text>
            <Text style={styles.headerSubtitle}>
              {searchedTracks.length} songs
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator size={'large'} color={'gray'} />
          ) : (
            <FlatList
              data={searchedTracks}
              keyExtractor={item => item.track.key}
              renderItem={({item}) => (
                <Pressable onPress={() => handlePlay(item)}>
                  <View style={styles.trackContainer}>
                    <Image
                      source={{uri: item.track.images.coverart}}
                      style={styles.trackImage}
                    />
                    <View style={styles.trackInfo}>
                      <Text style={styles.trackName}>{item.track.title}</Text>
                      <Text style={styles.trackAlbumName}>
                        {item.track.subtitle}
                      </Text>
                    </View>
                    <Entypo name="controller-play" size={24} color="white" />
                  </View>
                </Pressable>
              )}
            />
          )}
        </ScrollView>
      </LinearGradient>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={handleModalPress}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Pressable style={styles.modalHeader}>
                  <AntDesign name="down" size={24} color="white" />
                  <Text style={styles.modalTitle}>{selectedTrack?.title}</Text>
                  <Entypo name="dots-three-vertical" size={24} color="white" />
                </Pressable>
                <View style={styles.modalImageContainer}>
                  <Image
                    source={{uri: selectedTrack?.images.coverart}}
                    style={styles.modalImage}
                  />
                  <View style={styles.modalSongInfo}>
                    <View>
                      <Text style={styles.modalSongName}>
                        {selectedTrack?.title}
                      </Text>
                      <Text style={styles.modalSongArtist}>
                        {selectedTrack?.subtitle}
                      </Text>
                    </View>
                    <AntDesign name="heart" size={24} color="#1db954" />
                  </View>
                  <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${
                              (progress.position / progress.duration) * 100
                            }%`,
                          },
                        ]}
                      />
                      <View
                        style={[
                          styles.progressDot,
                          {
                            left: `${
                              (progress.position / progress.duration) * 100
                            }%`,
                          },
                        ]}
                      />
                    </View>
                    <View style={styles.progressTimeContainer}>
                      <Text style={styles.progressTime}>
                        {formatTime(progress.position)}
                      </Text>
                      <Text style={styles.progressTime}>
                        {formatTime(progress.duration)}
                      </Text>
                    </View>
                    <View style={styles.controlsContainer}>
                      <Pressable onPress={seekBackward}>
                        <Entypo
                          name="controller-fast-backward"
                          size={24}
                          color="white"
                        />
                      </Pressable>
                      <Pressable>
                        <Ionicons
                          name="play-skip-back-sharp"
                          size={30}
                          color="white"
                        />
                      </Pressable>
                      <Pressable onPress={togglePlay}>
                        {isPlaying ? (
                          <AntDesign
                            name="pausecircle"
                            size={60}
                            color="white"
                          />
                        ) : (
                          <View style={styles.playButtonLarge}>
                            <Entypo
                              name="controller-play"
                              size={26}
                              color="black"
                            />
                          </View>
                        )}
                      </Pressable>
                      <Pressable>
                        <Ionicons
                          name="play-skip-forward"
                          size={30}
                          color="white"
                        />
                      </Pressable>
                      <Pressable onPress={seekForward}>
                        <Entypo
                          name="controller-fast-forward"
                          size={24}
                          color="white"
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginTop: 70,
    marginHorizontal: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  backButton: {
    // Define back button styles here if needed
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 9,
    flex: 1,
    height: 38,
    backgroundColor: '#42275a',
    borderRadius: 6,
  },
  searchInput: {
    fontWeight: '500',
    opacity: 0.6,
    color: 'white',
  },
  header: {
    marginTop: 50,
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 13,
    marginTop: 5,
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  trackImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 10,
  },
  trackName: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  trackAlbumName: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#5072a7',
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  modalImageContainer: {
    marginTop: 20,
  },
  modalImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  modalSongInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  modalSongName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  modalSongArtist: {
    color: '#d3d3d3',
    marginTop: 4,
  },
  progressBarContainer: {
    marginTop: 10,
  },
  progressBar: {
    width: '100%',
    height: 3,
    backgroundColor: 'gray',
    borderRadius: 5,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1db954',
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  progressDot: {
    width: 10,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    position: 'absolute',
    top: -3,
  },
  progressTimeContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressTime: {
    color: 'white',
    fontSize: 15,
  },
  controlsContainer: {
    marginTop: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playButtonLarge: {
    backgroundColor: 'white',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});
