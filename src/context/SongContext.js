import {createContext, useState} from 'react';

const Songs = createContext();

const SongsProveder = ({children}) => {
  const [songs, setSongs] = useState([]);

  return <Songs.Provider value={songs}>{children}</Songs.Provider>;
};

export {Songs, SongsProveder};
