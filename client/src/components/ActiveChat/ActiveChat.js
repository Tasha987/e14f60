import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import { updateLastViewed } from "./../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexShrink: 8,
    flexBasis: 0, // so it calcs growth from 0 -- width does not grow unexpectedly!
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversation = props.conversation || {};

  useEffect(() => {
  const update = async () => {
      if (conversation.messages) {
        await props.updateLastViewed(conversation.messages[conversation.messages.length - 1])
      }
    }
    update()
  },[props.activeConversation]);

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    activeConversation: state.activeConversation,
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      ) 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLastViewed: (id) => {
      dispatch(updateLastViewed(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
