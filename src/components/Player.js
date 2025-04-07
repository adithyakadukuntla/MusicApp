import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { getSoundStatus } from '../utils/musicUtils';

const Player = ({ song, isPlaying, onPlay, onPause, onNext, onPrevious, defaultImage }) => {
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(song.duration || 0);
  
  // Format time from milliseconds to mm:ss
  const formatTime = (milliseconds) => {
    if (!milliseconds) return '00:00';
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };
  
  // Update position every second when playing
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(async () => {
        const status = await getSoundStatus();
        if (status && status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis || song.duration * 1000);
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, song]);
  
  return (
    <View style={styles.container}>
      <View style={styles.artworkContainer}>
        <Image
          source={defaultImage}
          style={styles.artwork}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{song.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{song.artist}</Text>
      </View>
      
      <View style={styles.controlsContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          minimumTrackTintColor="#1DB954"
          maximumTrackTintColor="#333"
          thumbTintColor="#1DB954"
          onSlidingComplete={(value) => setPosition(value)}
          thumbTouchSize={{ width: 30, height: 30 }}
          onValueChange={(value) => setPosition(value)}
          // when i change the values on slider it should play from that time 
          
          // when i change the values on slider it should pause the music
          

          // Disabled for simplicity, would need to implement seeking
          disabled={false}
        />
        
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onPrevious}>
            <Ionicons name="play-skip-back" size={32} color="#fff" />
          </TouchableOpacity>
          
          {isPlaying ? (
            <TouchableOpacity style={styles.playButton} onPress={onPause}>
              <Ionicons name="pause" size={40} color="#000" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.playButton} onPress={onPlay}>
              <Ionicons name="play" size={40} color="#000" />
            </TouchableOpacity>
          )}
          
          <TouchableOpacity onPress={onNext}>
            <Ionicons name="play-skip-forward" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingTop: 20,
  },
  artworkContainer: {
    width: '70%',
    aspectRatio: 1,
    marginBottom: 30,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 10,
  },
  artwork: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
  },
  infoContainer: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  artist: {
    fontSize: 16,
    color: '#b3b3b3',
    textAlign: 'center',
  },
  controlsContainer: {
    width: '90%',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  timeText: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  playButton: {
    backgroundColor: '#1DB954',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Player;