import { client } from '../libs/api';
import NavigationService from '../libs/NavigationService';

const getComments = async (postId: number) => {
  try {
    const commentRes = await client.get(`/post/comment/${postId}`);
    return commentRes.data.comments;
  } catch (error) {
    const errorRes = error.response.data;
    const status = error.response.status;
    console.log(errorRes);
  }
};

const addComment = async (postId: number, content: string) => {
  try {
    const commentRes = await client.post('/post/comment', { content, postId });
    return true;
  } catch (error) {
    const errorRes = error.response.data;
    const status = error.response.status;
    return false;
  }
};

export default { getComments, addComment };
