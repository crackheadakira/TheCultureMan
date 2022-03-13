const Discord = require('discord.js');

/**
 * Creates the default pagination object to avoid boilerplate.
 * @param {Array} pageList - An array of pages to be embedded.
 * @param {Object} message - The Discord message object.
 * @returns {Object} The pagination object.
 */
module.exports = (message, pageList) => {
    const buttonList = [
        new Discord.MessageButton().setCustomId("previousbtn").setLabel("Previous").setStyle("DANGER"),
        new Discord.MessageButton().setCustomId("nextbtn").setLabel("Next").setStyle("SUCCESS"),
    ];
    return {
        message,
        pageList,
        buttonList,
        autoButton: true,
        autoDelButton: true,
        timeout: 15000,
        replyMessage: false,
        autoDelete: false,
        authorIndependent: true,
    }
}
