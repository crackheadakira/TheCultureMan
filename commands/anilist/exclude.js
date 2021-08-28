const settings = require('../../config.json');
const anilist = require('anilist-node');
const Anilist = new anilist(settings.anitoken);
const Exclusion = require('../../schemas/ExclusionSchema');
const AnilistSchema = require('../../schemas/AnilistSchema');

module.exports = {
    name: 'exclude',
    description: 'This is a command to test excluding shit.',
    run: async (client, message, args) => {

        let string = message.content.replace("n.exclude ", "");
        let anilstName = "No Username has been set";

        const anilistCheck = await AnilistSchema.findOne({ userId: message.author.id });
        if (anilistCheck) {
            anilistName = anilistCheck.anilistName;
        } else {
            anilstName = "No Username has been set";
        }

        Anilist.searchEntry.anime(string, null, 1, 1).then(async Data => {
            try {

                let Series1 = Data.media;

                let S1FID = Series1.map(({ id }) => id);
                let S1T = Series1.map(({ title }) => title);
                let S1Title = S1T.map(({ romaji }) => romaji);
                S1Title = S1Title.toString();
                var S1ID = parseInt(S1FID);

                const excl = await Exclusion.create({
                    animeId: S1ID,
                    animeTitle: S1Title,
                    anilistName: anilistName,
                    userId: message.author.id,
                })

                message.channel.send(`Sucessfully excluded ${S1Title}`);

            } catch (err) {
                console.log("There was an error, here it is: " + err);
            }
        });

    }
}