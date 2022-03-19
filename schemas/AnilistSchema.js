const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('../db/db');

const AnilistSchema = sequelize.define("anilistuser", {

  anilistName: {
    type: DataTypes.STRING(32),
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.STRING(32),
    allowNull: false,
    unique: true,
    validate: {
      is: ["^[a-zA-Z0-9_]+$", 'i'],
      len: [1, 32]
    }
  }

});

module.exports = AnilistSchema;