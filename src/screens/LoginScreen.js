import {View, Text, SafeAreaView, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <SafeAreaView>
        <View style={{height: 80}} />
        <Entypo name="spotify" style={styles.logo} />
        <Text style={styles.loginTitle}>
          Millions of Songs Free on Spotify!
        </Text>
        <Pressable
          onPress={() => navigation.navigate('Main')}
          style={styles.loginButton}>
          <Text>Sign In with Spotify</Text>
        </Pressable>
        <Pressable style={styles.Button}>
          <SimpleLineIcons name="screen-smartphone" color={'white'} size={22} />
          <Text style={styles.text}>Contiune with phone number</Text>
        </Pressable>
        <Pressable style={styles.Button}>
          <AntDesign name="google" color={'white'} size={22} />
          <Text style={styles.text}>Contiune with Google</Text>
        </Pressable>
        <Pressable style={styles.Button}>
          <FontAwesome name="facebook" color={'white'} size={22} />
          <Text style={styles.text}>Contiune with Facebook</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  logo: {
    color: 'white',
    fontSize: 90,
    textAlign: 'center',
  },
  loginTitle: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: '#1db954',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 60,
    marginVertical: 10,
  },
  Button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderColor: '#c0c0c0',
    borderWidth: 0.8,
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 50,
    width: 300,
  },

  text: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
});
