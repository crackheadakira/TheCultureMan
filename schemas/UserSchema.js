const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    discordUsername: mongoose.SchemaTypes.String,
    discordId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    discordMessageContent: mongoose.SchemaTypes.String,
});

module.exports = mongoose.model('User', UserSchema);