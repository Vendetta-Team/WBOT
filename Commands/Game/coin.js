const Discord = require('discord.js')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
  var x = Math.floor((Math.random() * 2) + 1);
  let result = ""
  if(x == 1){
    result = locale.commands.find(e => e.name.includes('coin'))[lang].one
  }else{
    result = locale.commands.find(e => e.name.includes('coin'))[lang].two
  }
  embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .addField(locale.commands.find(e => e.name.includes('coin'))[lang].message1, result)
  message.reply(embed)
}  
