import axios from 'axios';
import {createContext, useEffect, useState} from 'react';
const ArtistsContext = createContext();

const ArtistsProvider = ({children}) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/search/',
      params: {
        q: 'popüler',
        type: 'artists',
        offset: '0',
        limit: '10',
        numberOfTopResults: '5',
      },
      headers: {
        'x-rapidapi-key': 'cfeb32209cmshafa7ce3e8d7ffa5p13348fjsn9470e48eb1a1',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const artistsItems = response.data?.artists?.items?.map(
        (artist, index) => ({
          uri: artist.data.uri,
          profile: artist.data.profile.name,
          avatarImage: artist.data.visuals.avatarImage.sources[0].url,
        }),
      );

      setArtists(artistsItems);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ArtistsContext.Provider value={{artists, loading, error}}>
      {children}
    </ArtistsContext.Provider>
  );
};
export {ArtistsContext, ArtistsProvider};
