const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "birthday",
    description: "This will tell you the birthdays of the people from bros before hoes.",
    type: 'general',
    run: async (client, message, args) => {
        try {

            let server = message.guild.id

            function calculateAge(birthdate) {
                return Math.floor((new Date() - new Date(birthdate)) / 31557600000)
            }

            function birthdayCalculator(month, day) {

                var manos = new Date(),
                    vijay = manos.getFullYear(),
                    next = new Date(vijay, month - 1, day);

                manos.setHours(0, 0, 0, 0);

                if (manos > next) next.setFullYear(vijay + 1);

                return Math.round((next - manos) / 8.64e7);
            }

            var bd1 = birthdayCalculator(03, 05);
            var bd2 = birthdayCalculator(03, 11);
            var bd3 = birthdayCalculator(03, 18);
            var bd4 = birthdayCalculator(04, 23);
            var bd5 = birthdayCalculator(06, 24);
            var bd7 = birthdayCalculator(07, 18);
            var bd8 = birthdayCalculator(08, 03);
            var bd10 = birthdayCalculator(08, 20);
            var bd11 = birthdayCalculator(09, 12);
            var bd12 = birthdayCalculator(10, 01);
            var bd13 = birthdayCalculator(11, 12);
            var bd14 = birthdayCalculator(11, 29);
            var bd15 = birthdayCalculator(03, 19)
            var bd16 = birthdayCalculator(06, 24)
            var bd17 = birthdayCalculator(10, 15)
            var bd18 = birthdayCalculator(03, 07)

            let basicInfo = `
        <@420825464245059586> birthday - march 5th **${bd1} day's to go** AGE: **${calculateAge("2009-03-05")}** \n 
        <@592338499810885653> birthday - march 7th **${bd18} day's to go** AGE: **${calculateAge("2007-03-07")}** \n
        <@327012928031162368> birthday - march 11th **${bd2} day's to go** AGE: **${calculateAge("2007-03-11")}**\n
        <@529146606470168616> birthday - march 18th **${bd3} day's to go** AGE: **${calculateAge("2007-03-18")}**\n
        <@343726471124090881> birthday - march 19th **${bd15} day's to go** AGE: **${calculateAge("2005-03-19")}**\n
        <@236907218342117376> birthday - april 23rd **${bd4} day's to go** AGE: **${calculateAge("2007-04-23")}**\n
        <@313699902758715404> birthday - june 24th **${bd5} day's to go** AGE: **${calculateAge("2005-06-24")}**\n
        <@211952293476696066> birthday - june 24th **${bd16} day's to go** AGE: **${calculateAge("2002-06-24")}**\n
        <@419512104685666304> birthday - july 18th **${bd7} day's to go** AGE: **${calculateAge("2006-07-18")}**\n
        <@422007636133675018> birthday - august 3rd **${bd8} day's to go** AGE: **${calculateAge("2006-08-03")}**\n
        <@212179051652055040> birthday - august 20th **${bd10} day's to go** AGE: **${calculateAge("2004-08-20")}**\n
        <@795261856964673536> birthday - september 12th **${bd11} day's to go** AGE: **${calculateAge("2006-09-12")}**\n
        <@227032992978042881> birthday - october 1st **${bd12} day's to go** AGE: **${calculateAge("2003-10-01")}**\n
        <@618204263767867412> birthday - october 15th **${bd17} day's to go** AGE: **${calculateAge("2004-10-15")}**\n
        <@696943140183081052> birthday - november 12th **${bd13} day's to go** AGE: **${calculateAge("2008-11-12")}**\n
        <@794890277332320256> birthday - november 29th **${bd14} day's to go** AGE: **${calculateAge("2006-11-29")}**\n
        `;

            const counts = [bd1, bd2, bd3, bd4, bd5, bd7, bd8, bd10, bd11, bd12, bd13, bd14, bd15, bd16, bd17, bd18];
            const goal = 0;
            const nextBirthday = counts.reduce((prev, curr) => Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);

            if (server == 843208877326860299) {

                let embed = new MessageEmbed()
                    .setTitle("Here's the birthday's of every bros before hoes member")
                    .setDescription(basicInfo)

                if (nextBirthday === bd1) {
                    embed.setDescription(`${basicInfo} It's <@420825464245059586>'s birthday next, in ${nextBirthday} days!`)
                }
                if (nextBirthday === bd2) {
                    embed.setDescription(`${basicInfo} It's <@327012928031162368>'s birthday next, in ${nextBirthday} days!`)
                }
                if (nextBirthday === bd3) {
                    embed.setDescription(`${basicInfo} It's <@529146606470168616>'s birthday next, in ${nextBirthday} days!`)
                }
                if (nextBirthday === bd4) {
                    embed.setDescription(`${basicInfo} It's <@236907218342117376>'s birthday next, in ${nextBirthday} days!`)
                }
                if (nextBirthday === bd5) {
                    embed.setDescription(`${basicInfo} It's <@313699902758715404>'s birthday next, in ${nextBirthday} days!`)
                }
                if (nextBirthday === bd7) {
                    embed.setDescription(`${basicInfo} It's <@419512104685666304>'s birthday next, in ${nextBirthday} days!`)
                }
                if (nextBirthday === bd8) {
                    embed.setDescription(`${basicInfo} It's <@422007636133675018>'s birthday next, in ${nextBirthday} days!`)
                }
                if (nextBirthday === bd10) {
                    embed.setDescription(`${basicInfo} It's <@852665699892985866>'s birthday next, in ${nextBirthday} days!`)
                }
                if (nextBirthday === bd11) {
                    embed.setDescription(`${basicInfo} It's <@795261856964673536>'s birthday next, in ${nextBirthday} days!`)
                }
                if (nextBirthday === bd12) {
                    embed.setDescription(`${basicInfo} It's <@227032992978042881>'s birthday next, in ${nextBirthday} days!`)
                }
                if (nextBirthday === bd13) {
                    embed.setDescription(`${basicInfo} It's <@696943140183081052>'s birthday next, in ${nextBirthday} days!`)
                }
                if (nextBirthday === bd14) {
                    embed.setDescription(`${basicInfo} It's <@794890277332320256>'s birthday next, in ${nextBirthday} days!`)
                }
                if (nextBirthday === bd15) {
                    embed.setDescription(`${basicInfo} It's <@343726471124090881>'s birthday next, in ${nextBirthday} days!`)
                }
                if (nextBirthday === bd16) {
                    embed.setDescription(`${basicInfo} It's <@211952293476696066>'s birthday next, in ${nextBirthday} days!`)
                }
                if (nextBirthday === bd17) {
                    embed.setDescription(`${basicInfo} It's <@618204263767867412>'s birthday next, in ${nextBirthday} days!`)
                }
                if (nextBirthday === bd18) {
                    embed.setDescription(`${basicInfo} It's <@592338499810885653>'s birthday next, in ${nextBirthday} days!`)
                }

                message.channel.send({ embeds: [embed] })

                if (bd1 === 0) {
                    message.channel.send("@everyone it's <@420825464245059586> birthday today")
                } else if (bd2 === 0) {
                    message.channel.send("@everyone it's <@327012928031162368> birthday today")
                } else if (bd3 === 0) {
                    message.channel.send("@everyone it's <@529146606470168616> birthday today")
                } else if (bd4 === 0) {
                    message.channel.send("@everyone it's <@236907218342117376> birthday today")
                } else if (bd5 === 0) {
                    message.channel.send("@everyone it's <@313699902758715404> birthday today")
                } else if (bd7 === 0) {
                    message.channel.send("@everyone it's <@419512104685666304> birthday today")
                } else if (bd8 === 0) {
                    message.channel.send("@everyone it's <@422007636133675018> birthday today")
                } else if (bd10 === 0) {
                    message.channel.send("@everyone it's <@852665699892985866> birthday today")
                } else if (bd11 === 0) {
                    message.channel.send("@everyone it's <@795261856964673536> birthday today")
                } else if (bd12 === 0) {
                    message.channel.send("@everyone it's <@227032992978042881> birthday today")
                } else if (bd13 === 0) {
                    message.channel.send("@everyone it's <@696943140183081052> birthday today")
                } else if (bd14 === 0) {
                    message.channel.send("@everyone it's <@794890277332320256> birthday today")
                } else if (bd15 === 0) {
                    message.channel.send("@everyone it's <@343726471124090881> birthday today")
                } else if (bd16 === 0) {
                    message.channel.send("@everyone it's <@211952293476696066> birthday today")
                } else if (bd17 === 0) {
                    message.channel.send("@everyone it's <@211952293476696066> birthday today")
                } else if (bd18 === 0) {
                    message.channel.send("@everyone it's <@592338499810885653> birthday today")
                }

            } else return message.channel.send("only compatible in a specific server");

        } catch (error) {
            message.channel.send("There was an error running this command, try again later.")
            console.log(error)
        }
    }
}