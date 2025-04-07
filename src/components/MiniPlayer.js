import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MiniPlayer = ({ song, isPlaying, onPress, onPlayPause, defaultImage }) => {
  if (!song) return null;
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image 
        source={defaultImage} 
        style={styles.artwork} 
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{song.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{song.artist}</Text>
      </View>
      <TouchableOpacity onPress={onPlayPause} style={styles.playButton}>
        <Ionicons 
          name={isPlaying ? 'pause' : 'play'} 
          size={24} 
          color="#1DB954" 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#282828',
    borderTopWidth: 1,
    borderTopColor: '#333',
    height: 60,
  },
  artwork: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#333',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 2,
  },
  artist: {
    fontSize: 12,
    color: '#b3b3b3',
  },
  playButton: {
    padding: 8,
  },
});

export default MiniPlayer;