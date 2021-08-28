const mongoose = require('mongoose');

const AnilistSchema = new mongoose.Schema({
  
  anilistName: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  userId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  userName: {
    type: mongoose.SchemaTypes.String,
  },
  
});

module.exports = mongoose.model("Anilist", AnilistSchema);