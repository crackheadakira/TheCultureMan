let AnilistSchema = require('../schemas/AnilistSchema');
module.exports = async function (message) {
    return new Promise((resolve, reject) => {
        AnilistSchema.findOne({ where: { userId: message.author.id } })
            .then((anilistCheck) => {
                if (!anilistCheck) {
                    return message.channel.send("You have yet to set an AniList token.")
                }
                resolve(anilistCheck)
            }).catch((error) => {
                reject(error);
            });
    });
}