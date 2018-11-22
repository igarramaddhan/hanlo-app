//@flow

import { types } from 'mobx-state-tree';
import moment from 'moment';

const Message = types.model('Message', {
  id: types.number,
  content: types.string,
  createdAt: types.string,
  updatedAt: types.string,
  from: types.number,
  to: types.number,
  isOtherDay: types.boolean
});

const CurrentMessageStore = types
  .model('CurrentMessage', {
    messages: types.array(Message)
  })
  .actions(self => ({
    setCurrentMessage(currentMessage) {
      const messages = currentMessage.map((item, index) => {
        let isOtherDay = false;
        if (index < currentMessage.length - 1) {
          const messageDate = moment(item.createdAt);
          const nextMessageDate = moment(currentMessage[index + 1].createdAt);
          if (messageDate.date() - nextMessageDate.date() > 0) {
            isOtherDay = true;
          }
        } else {
          if (!moment().isSame(moment(item.createdAt), 'day')) {
            isOtherDay = true;
          }
        }

        const message = {
          ...item,
          isOtherDay
        };

        return message;
      });
      self.messages = messages;
    }
  }))
  .create({ messages: [] });

export default CurrentMessageStore;
