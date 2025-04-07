import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MusicList from '../components/MusicList';
import PermissionRequest from '../components/PermissionRequest';
import { requestMusicPermission } from '../utils/permissionUtils';
import { getAllSongs } from '../utils/musicUtils';
// import MiniPlayer from '../components/MiniPlayer';

// Default album art image
const defaultAlbumArt = require('../../assets/defaultAlbum.png');

const HomeScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const checkPermissionAndLoadSongs = async () => {
    const granted = await requestMusicPermission();
    setHasPermission(granted);
    
    if (granted) {
      await loadSongs();
    } else {
      setLoading(false);
    }
  };
  
  const loadSongs = async () => {
    setLoading(true);
    const result = await getAllSongs();
    
    if (result.success) {
      setSongs(result.songs);
    } else {
      Alert.alert('Error', 'Failed to load music: ' + result.error);
    }
    
    setLoading(false);
  };
  
  const handleSongPress = (song) => {
    navigation.navigate('Player', { song, allSongs: songs });
  };
  
  useEffect(() => {
    checkPermissionAndLoadSongs();
  }, []);
  
  if (!hasPermission) {
    return <PermissionRequest onRequestPermission={checkPermissionAndLoadSongs} />;
  }
  
  
  return (
    <View style={styles.container}>
      <MusicList 
        songs={songs} 
        onSongPress={handleSongPress} 
        loading={loading}
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

export default HomeScreen;