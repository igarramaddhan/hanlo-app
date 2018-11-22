import { client, removeLocalAuthToken } from '../libs/api';
import UserStore from '../stores/UserStore';
import NavigationService from '../libs/NavigationService';

const getPosts = async () => {
  try {
    const postRes = await client.get('/post');
    return postRes.data.posts;
  } catch (error) {
    const errorRes = error.response.data;
    const status = error.response.status;
    if (status === 500) {
      removeLocalAuthToken();
      NavigationService.navigate('Splash');
    }
  }
};

const addPost = async (content: string) => {
  try {
    const postRes = await client.post('/post', { content });
    return true;
  } catch (error) {
    const errorRes = error.response.data;
    const status = error.response.status;
    return false;
  }
};

const getUserPosts = async (userId: number) => {
  try {
    const postRes = await client.get(`/post/user/${userId}`);
    return postRes.data.posts;
  } catch (error) {
    const errorRes = error.response.data;
    const status = error.response.status;
    if (status === 500) {
      removeLocalAuthToken();
      NavigationService.navigate('Splash');
    }
  }
};

export default { getPosts, addPost, getUserPosts };
