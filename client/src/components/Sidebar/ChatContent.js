import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Transition } from "react-transition-group"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
    position: "relative",
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  newMessage: {
    color: "#000000",
    fontWeight: 600,
  },
  unreadCount: {
    transition: `opacity ${duration}ms ease-in-out`,
    // position: "relative",
    margin: 0,
    marginRight: 20,
    fontSize: 12,
    background: "#3F92FF",
    borderRadius: 10,
    height: 20,
    minWidth: 20,
    padding: "1px 6px 1px 6px",
    // margin: 0,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    opacity: 0,
  },
}));

const duration = 300

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
}

const ChatContent = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { latestMessageText, otherUser, notificationCount } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={`${classes.previewText} ${notificationCount > 0 && classes.newMessage}`}>
          {latestMessageText}
        </Typography>
      </Box>
      <Transition in={notificationCount > 0} timeout={duration}>{state=>(
          <Box className={classes.unreadCount} style={{...transitionStyles[state]}}>{notificationCount > 0 ? notificationCount : ''}</Box>
          )}
      </Transition>
    </Box>
  );
};

export default ChatContent;
