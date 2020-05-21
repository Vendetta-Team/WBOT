const Discord = require('discord.js')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    if (message.mentions.users.first()) {
        const embed = new Discord.MessageEmbed()
            .setTitle(message.mentions.users.first().tag)
            .setImage(message.mentions.users.first().displayAvatarURL())
        message.reply(embed)
    } else if (message.guild.members.cache.get(args[0])) {
        const embed = new Discord.MessageEmbed()
            .setTitle(message.guild.members.cache.get(args[0]).tag)
            .setImage(message.guild.members.cache.get(args[0]).displayAvatarURL())
        message.reply(embed)
    } else {
        const embed = new Discord.MessageEmbed()
            .setTitle(message.author.tag)
            .setImage(message.author.displayAvatarURL())
        message.reply(embed)
    }
}