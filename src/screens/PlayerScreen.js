import React, { useState, useEffect } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import Player from '../components/Player';
import { playSound, pauseSound, resumeSound } from '../utils/musicUtils';

// Default album art image
const defaultAlbumArt = require('../../assets/defaultAlbum.png');

const PlayerScreen = ({ route, navigation }) => {
  const { song, allSongs } = route.params;
  const [currentSong, setCurrentSong] = useState(song);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Find the current song index
  const findSongIndex = () => {
    return allSongs.findIndex(s => s.id === currentSong.id);
  };
  
  // Play the next song
  const playNextSong = () => {
    const currentIndex = findSongIndex();
    if (currentIndex < allSongs.length - 1) {
      const nextSong = allSongs[currentIndex + 1];
      setCurrentSong(nextSong);
      handlePlaySong(nextSong);
    }
  };
  
  // Play the previous song
  const playPreviousSong = () => {
    const currentIndex = findSongIndex();
    if (currentIndex > 0) {
      const prevSong = allSongs[currentIndex - 1];
      setCurrentSong(prevSong);
      handlePlaySong(prevSong);
    }
  };
  
  // Handle play song
  const handlePlaySong = async (songToPlay) => {
    const result = await playSound(songToPlay.uri);
    if (result.success) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };
  
  // Handle play button
  const handlePlay = async () => {
    if (!isPlaying) {
      // If this is the first play or a new song
      const result = isPlaying ? await resumeSound() : await playSound(currentSong.uri);
      if (result.success) {
        setIsPlaying(true);
      }
    }
  };
  
  // Handle pause button
  const handlePause = async () => {
    if (isPlaying) {
      const result = await pauseSound();
      if (result.success) {
        setIsPlaying(false);
      }
    }
  };
  
  // Play the song automatically when the screen loads
  useEffect(() => {
    handlePlaySong(currentSong);
    
    // Handle back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
    
    return () => {
      pauseSound();
      backHandler.remove();
    };
  }, []);
  
  return (
    <View style={styles.container}>
      <Player
        song={currentSong}
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onNext={playNextSong}
        onPrevious={playPreviousSong}
        defaultImage={defaultAlbumArt}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});

export default PlayerScreen;
