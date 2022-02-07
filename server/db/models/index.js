const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Room = require("./room");

// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

// new model Room does not disrupt existing Conversations model
Room.belongsToMany(User, { through: 'userRooms' })
// I created every room to have an owner, but eventually this doesn't need to be true
// it's so adding users can only be done by one user/owner
// the owner has to click to explicitely create a room as opposed to a conversation --
// that way the models remain separate for now and their is less confusion for users
Room.belongsTo(User, { as: 'owner' })
User.belongsToMany(Room, { through: 'userRooms' })
Message.belongsTo(Room);
Room.hasMany(Message)

module.exports = {
  User,
  Conversation,
  Message,
  Room
};
