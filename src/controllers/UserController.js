import { AsyncStorage } from 'react-native';
import { client } from '../libs/api';
import UserStore from '../stores/UserStore';

const login = async (username: string, password: string) => {
  try {
    const userRes = await client.post('/login', {
      username: username,
      password: password
    });
    AsyncStorage.setItem('token', userRes.data.token);
    UserStore.setToken(userRes.data.token);
    client.defaults.headers.common['Authorization'] = `Bearer ${
      userRes.data.token
    }`;
    return { error: '' };
  } catch (error) {
    console.log('Error at login: ', error.response.data);
    return { error: error.response.data.message };
    // throw error;
  }
};

const register = async (
  displayName: string,
  username: string,
  password: string
) => {
  try {
    const userRes = await client.post('/register', {
      displayName: displayName,
      username: username,
      password: password
    });
    AsyncStorage.setItem('token', userRes.data.token);
    UserStore.setToken(userRes.data.token);
    client.defaults.headers.common['Authorization'] = `Bearer ${
      userRes.data.token
    }`;
    return { error: '' };
  } catch (error) {
    console.log('Error at register: ', error.response.data);
    return { error: error.response.data.message };
    // throw error;
  }
};

const logout = async () => {
  try {
    await AsyncStorage.clear();
    UserStore.setToken('');
    client.defaults.headers.common['Authorization'] = '';
  } catch (error) {
    console.log(error);
  }
};

const me = async () => {
  try {
    const userRes = await client.get('/me');
    return userRes.data.user;
  } catch (error) {
    console.log(error);
  }
};

const findUser = async (username: string) => {
  try {
    const userRes = await client.get(`/user/find/${username}`);
    return userRes.data.users;
  } catch (error) {
    console.log(error);
  }
};

export default {
  login,
  register,
  logout,
  me,
  findUser
};
