const { Op } = require("sequelize");
const db = require("../db");

const Room = db.define("room", {});

// you can have a room of size 2 (or obviously a conversation of size 2) eventualy conversation won't be needed
const minRoomSize = 1;

// find conversation given *any amount of* user Ids
Room.findRoom = async function (...userIds) {

  if (userIds.length < minRoomSize) return null;

    const room = await Room.findOne({
      where: {
        userIds: {
          [Op.and]: {
            [Op.contains]: userIds, 
            [Op.contained]: userIds // finds room containing just the users given
        }
      }
    }
  })

  // return room or null if it doesn't exist
  return room;
}

module.exports = Room;