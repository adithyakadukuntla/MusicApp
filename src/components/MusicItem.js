import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MusicItem = ({ song, onPress, defaultImage }) => {
  // Format duration from seconds to mm:ss
  const formatDuration = (durationSec) => {
    if (!durationSec) return '00:00';
    const minutes = Math.floor(durationSec / 60);
    const seconds = Math.floor(durationSec % 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(song)}>
      <Image 
        source={defaultImage} 
        style={styles.artwork} 
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{song.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{song.artist}</Text>
      </View>
      <Text style={styles.duration}>{formatDuration(song.duration)}</Text>
      <Ionicons name="play-circle-outline" size={24} color="#1DB954" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#333',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 4,
  },
  artist: {
    fontSize: 14,
    color: '#b3b3b3',
  },
  duration: {
    marginRight: 12,
    fontSize: 12,
    color: '#b3b3b3',
  },
});

export default MusicItem;