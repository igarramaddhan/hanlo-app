//@flow

import { types } from 'mobx-state-tree';

const UserStore = types
  .model('User', {
    username: types.string,
    token: types.string
  })
  .actions(self => ({
    setToken(token) {
      self.token = token;
    }
  }))
  .create({ username: '', token: '' });

export default UserStore;
