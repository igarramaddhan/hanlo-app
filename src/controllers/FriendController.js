import { client } from '../libs/api';

const getFriends = async () => {
  try {
    const friendRes = await client.get('/friend');
    return friendRes.data.friends;
  } catch (error) {
    console.log(error.response.data);
  }
};

const addFriend = async (friendId: string) => {
  try {
    const friendRes = await client.post('/friend/add', {
      friendId
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export default {
  getFriends,
  addFriend
};
