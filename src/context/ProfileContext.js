import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

const ProfileContext = createContext();

const ProfileProvider = ({children}) => {
  const [profiles, setProfiles] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfiles = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/user_profile/',
      params: {
        id: 'nocopyrightsounds',
        playlistLimit: '10',
        artistLimit: '10',
      },
      headers: {
        'x-rapidapi-key': 'cfeb32209cmshafa7ce3e8d7ffa5p13348fjsn9470e48eb1a1',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setProfiles(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message || error);
    }
  };

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <ProfileContext.Provider value={{profiles, loading, error}}>
      {children}
    </ProfileContext.Provider>
  );
};

export {ProfileContext, ProfileProvider};
