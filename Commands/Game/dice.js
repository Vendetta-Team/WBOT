const Discord = require('discord.js')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
  var x = Math.floor((Math.random() * 6) + 1);
  embed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .addField(locale.commands.find(e => e.name.includes('dice'))[lang].message1, x)
  message.reply(embed)
}  
