import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const findLastReadMsg = (messages, userId) => {
  for (let i = messages.length - 1; i >=0; i--) {
    const msg = messages[i]
    if (msg.read && msg.senderId === userId) {
      return i
    }
  }
  return false
}

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  const lastReadMessage = findLastReadMsg(messages, userId)
  
  return (
    <Box>
      {messages.map((message, i) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} isLastRead={lastReadMessage === i} otherUser={otherUser}/>
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
