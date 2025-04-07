import { Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';

let sound = null;

export const getAllSongs = async () => {
  try {
    // Get permission first
    const { status } = await MediaLibrary.requestPermissionsAsync();
    
    if (status !== 'granted') {
      return { success: false, error: 'Permission not granted' };
    }
    
    // Get all audio files
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: 1000 // Limit to first 500 songs
    });
    
    // Get more details for each song
    const songs = await Promise.all(
      media.assets.map(async (asset) => {
        try {
          const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
         // console.log("asset info",assetInfo)
          return {
            id: asset.id,
            uri: assetInfo.uri,
            filename: asset.filename,
            duration: asset.duration,
            creationTime:asset.creationTime,
            title: asset.filename.replace(/\.[^/.]+$/, ""), // Remove file extension
            artist: asset.artist || "unknown artist", // This info might not be available directly through MediaLibrary
            album: asset.albumId||'Unknown Album',
            artwork: assetInfo.uri // In many cases we won't have album art this way
          };
        } catch (error) {
          console.log("Error getting asset info:", error);
          return null;
        }
      })
    );
    
    return { 
      success: true, 
      songs: songs.filter(song => song !== null) 
    };
  } catch (error) {
    console.log("Error getting songs:", error);
    return { success: false, error: error.message };
  }
};

export const playSound = async (uri) => {
  try {
    // Stop any currently playing sound
    if (sound !== null) {
      await sound.unloadAsync();
    }
    
    // Load the sound
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true }
    );
    
    sound = newSound;
    return { success: true };
  } catch (error) {
    console.log("Error playing sound:", error);
    return { success: false, error: error.message };
  }
};

export const pauseSound = async () => {
  try {
    if (sound !== null) {
      await sound.pauseAsync();
      return { success: true };
    }
    return { success: false, error: 'No sound playing' };
  } catch (error) {
    console.log("Error pausing sound:", error);
    return { success: false, error: error.message };
  }
};

export const resumeSound = async () => {
  try {
    if (sound !== null) {
      await sound.playAsync();
      return { success: true };
    }
    return { success: false, error: 'No sound loaded' };
  } catch (error) {
    console.log("Error resuming sound:", error);
    return { success: false, error: error.message };
  }
};

export const stopSound = async () => {
  try {
    if (sound !== null) {
      await sound.stopAsync();
      await sound.unloadAsync();
      sound = null;
      return { success: true };
    }
    return { success: false, error: 'No sound playing' };
  } catch (error) {
    console.log("Error stopping sound:", error);
    return { success: false, error: error.message };
  }
};

export const getSoundStatus = async () => {
  try {
    if (sound !== null) {
      return await sound.getStatusAsync();
    }
    return null;
  } catch (error) {
    console.log("Error getting sound status:", error);
    return null;
  }
};