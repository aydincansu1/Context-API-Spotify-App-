import React from 'react';

import Routes from './src/navigation/Routes';
import {SongsProveder} from './src/context/SongContext';
import {AlbumsProvider} from './src/context/AlbumsContext';
import {ArtistsProvider} from './src/context/ArtistContext';
import {ProfileProvider} from './src/context/ProfileContext';

export default function App() {
  return (
    <>
      <ProfileProvider>
        <ArtistsProvider>
          <AlbumsProvider>
            <SongsProveder>
              <Routes />
            </SongsProveder>
          </AlbumsProvider>
        </ArtistsProvider>
      </ProfileProvider>
    </>
  );
}
