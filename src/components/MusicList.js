import React from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import MusicItem from './MusicItem';

const MusicList = ({ songs, onSongPress, loading, defaultImage }) => {
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={styles.loadingText}>Loading your music...</Text>
      </View>
    );
  }

  if (songs.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noSongsText}>No music files found</Text>
        <Text style={styles.subText}>Add some music to your device and try again</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={songs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MusicItem song={item} onPress={onSongPress} defaultImage={defaultImage} />
      )}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#121212',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
  noSongsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#b3b3b3',
    textAlign: 'center',
  },
});

export default MusicList;