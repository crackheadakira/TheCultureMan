const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('../db/db');

const AnilistSchema = sequelize.define("anilistuser", {

  userId: {
    type: DataTypes.STRING(32),
    allowNull: false,
    unique: true,
    validate: {
      is: ["^[a-zA-Z0-9_]+$", 'i'],
      len: [1, 32]
    }
  },
  authToken: {
    type: DataTypes.STRING(2048),
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 2048]
    }
  },
  anilistID: {
    type: DataTypes.INTEGER(32),
    allowNull: false,
    unique: true,
    validate: {
      is: ["^[0-9]*$", 'i'],
      len: [1, 32]
    }
  }

});

module.exports = AnilistSchema;