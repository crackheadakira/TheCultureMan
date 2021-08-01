const Discord = require('discord.js');
const client = new Discord.Client();
const paginationEmbed = require('discord.js-pagination');

module.exports = {
    name: "tags",
    description: "This will show you all tags with an explanation of what it is.",
    execute(message, args) {

        const embed1 = new Discord.MessageEmbed()
            .setColor('eb9840')
            .setTitle('Tags')
            .addFields(
                { name: "Big Breasts", value: "Features a character / characters with big breasts" },
                { name: "Sole Female", value: "Only a single woman get's fucked in a doujin with this tag" },
                { name: "Group", value: "Features a group of people have sex" },
                { name: "Sole Male", value: "Only a single male get's fucked in a doujin with this tag" },
                { name: "Lolicon", value: "Features a character / characters that likes loli's" },
                { name: "Anal", value: "Features a character / characters getting fucked in the asshole" },
                { name: "Stockings", value: "Features a character / characters wearing stockings" },
                { name: "Schoolgirl Uniform", value: "Featuring a character / characters wearing a schoolgirl uniform" },
                { name: "Glasses", value: "Features a character / characters wearing glasses" },
                { name: "Nakadashi", value: "Features a character / characters getting a creampie" },
                { name: "Blowjob", value: "Features a character / characters getting their dicks sucked" },
                { name: "Shotacon", value: "Features a character / characters that likes shota's" },
                { name: "Full Color", value: "A doujin with this tag will be in color instead of the usual Black and White" },
                { name: "Rape", value: "Features a character / characters getting fucked without their consent" },
                { name: "Bondage", value: "Features a character / characters getting tied up" },
                { name: "Yaoi", value: "Features males having sex or making out" },
                { name: "Ahegao", value: "Features a character / characters making very lewd faces, usually with a tongue sticking out" },
                { name: "Incest", value: "Features two characters or more of the same heritage engaging in sexual activities together" },
                { name: "Mosaic Censorships", value: "A type of censoring that uses blocky pixels" },
                { name: "MILF", value: "Features an older woman / women" },
            )

        const embed2 = new Discord.MessageEmbed()
            .setColor('eb9840')
            .setTitle('Tags')
            .addFields(
                { name: "Males Only", value: "Only features males engaging in sexual activities" },
                { name: "Double Penetration", value: "Features a character / characters getting penetrated in their pussy and asshole at the same time" },
                { name: "Tankoubon", value: "A volume of a series" },
                { name: "Defloration", value: "Features a character / characters losing their virginity" },
                { name: "Paizuri", value: "Features a character / characters giving someone a handjob using their boobs" },
                { name: "Futanari", value: "Features a female / females with cocks" },
                { name: "Dark Skin", value: "Features a character / characters with dark skin" },
                { name: "X-Ray", value: "Features a character / characters seen through an X-ray" },
                { name: "Sex Toys", value: "Features sex toys" },
                { name: "Yuri Swimsuit", value: "Features lesbians wearing swimsuits" },
                { name: "Full Censorship", value: "Features heavy amount of censorship" },
                { name: "FFM Threesome", value: "Features a male engaging in sexual activities with two females" },
                { name: "Femdom", value: "Features a female / females that are being the dominant people in the sexual activity" },
                { name: "Netotare", value: "Features a character / characters cheating in their relationship against their will" },
                { name: "Multi-Work Series", value: "A doujin that has this tag has more doujins that continue the story" },
                { name: "Impregnation", value: "Features a character / characters getting impregnated" },
                { name: "DILF", value: "Features an older man / men" },
                { name: "Pantyhose", value: "Features a character / characters wearing a pantyhose" },
                { name: "Collar", value: "Features a character / characters wearing a collar" },
                { name: "Sister", value: "Features a sister of a significant character" },
            )

        pages = [
            embed1,
            embed2
        ];

        emojiList = [
             '⬅️',
             '➡️'
        ];

        paginationEmbed(message, pages, emojiList);
    }
}