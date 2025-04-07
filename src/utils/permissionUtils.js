import { PermissionsAndroid, Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export const requestMusicPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      // For Android 13+ (API level 33+)
      if (Platform.Version >= 33) {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
          {
            title: "Music Player Audio Permission",
            message: "Music Player needs access to your audio files",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        return permission === PermissionsAndroid.RESULTS.GRANTED;
      } 
      // For Android 12 and below
      else {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Music Player Storage Permission",
            message: "Music Player needs access to your storage to read music files",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        return permission === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    // For iOS
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  }
};