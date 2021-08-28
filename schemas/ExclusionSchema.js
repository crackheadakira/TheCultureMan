const mongoose = require('mongoose');

const ExclusionSchema = new mongoose.Schema({

  animeId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  animeTitle: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  anilistName: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  userId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  }

});

module.exports = mongoose.model("Exclusion", ExclusionSchema);