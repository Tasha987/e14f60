export const updateMessagesInStore = (state, message) => {

  return state.map((convo) => {
    if (convo.id !== message.conversationId) return convo
    const messagesCopy = convo.messages.map(message => {
      const messageCopy = {...message, read: true}
      return messageCopy
    })
    const convoCopy = { ...convo, messages: messagesCopy }
    convoCopy.notificationCount = 0
    return convoCopy
  });
};

export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    newConvo.notificationCount = newConvo.otherUser.id === message.senderId ? 1 : 0
    return [newConvo, ...state];
  }
  return state.map((convo) => {
    if (convo.id === message.conversationId) {
        const convoCopy = { ...convo, messages: [...convo.messages, message] }
        convoCopy.notificationCount = convo.otherUser.id === message.senderId ? convoCopy.notificationCount + 1 : 0
        convoCopy.latestMessageText = message.text
        return convoCopy
      } else {
        return convo;
      }
  })
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: true };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: false };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = { ...convo, messages: [...convo.messages, message] }
      convoCopy.id = message.conversationId;
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};
