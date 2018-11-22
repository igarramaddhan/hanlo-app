import Axios from 'axios';
import { AsyncStorage } from 'react-native';
import UserStore from '../stores/UserStore';

export const client = Axios.create({
  baseURL: 'https://api.ynrk.tk/hanlo/api',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
});

export const readLocalAuthToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    UserStore.setToken(token);
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return token;
};

export const removeLocalAuthToken = async () => {
  await AsyncStorage.clear();
  UserStore.setToken('');
  client.defaults.headers.common['Authorization'] = null;
};
