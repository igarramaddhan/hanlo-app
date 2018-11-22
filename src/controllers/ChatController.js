import { AsyncStorage } from 'react-native';
import { client } from '../libs/api';
import UserStore from '../stores/UserStore';

const getMessages = async () => {
  try {
    const messageRes = await client.get('/message');
    return messageRes.data.messages;
  } catch (error) {
    console.log(error.response.data);
  }
};

const sendMessage = async (to: number, content: string) => {
  try {
    const messageRes = await client.post('/message', {
      to,
      content
    });
    console.log(messageRes);
  } catch (error) {
    console.log(error.response.data);
  }
};

const getUserMessages = async (userId: number) => {
  try {
    const messageRes = await client.get(`/message/user/${userId}`);
    return messageRes.data.messages;
  } catch (error) {
    console.log(error.response.data);
  }
};

export default {
  getMessages,
  sendMessage,
  getUserMessages
};
