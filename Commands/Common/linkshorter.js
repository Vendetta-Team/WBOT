const shorten = require('isgd');
const Discord = require("discord.js");

exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
  if (!args[0]) return message.channel.send(locale.commands.find(e => e.name.includes('linkshorter'))[lang].message1)
  if (!args[1]) {
    shorten.shorten(args[0], function (res) {
      if (res.startsWith('error:')) return message.channel.send(locale.commands.find(e => e.name.includes('linkshorter'))[lang].message2);
      let E = new Discord.MessageEmbed()
        .setTitle(locale.commands.find(e => e.name.includes('linkshorter'))[lang].message3)
        .setColor(0xff2f2f)
        .addField(locale.commands.find(e => e.name.includes('linkshorter'))[lang].message4.replace('$[사용자]', message.author.tag), locale.commands.find(e => e.name.includes('linkshorter'))[lang].message5.replace('$[링크]', res))
        .addField(locale.commands.find(e => e.name.includes('linkshorter'))[lang].message6.replace('$[사용자]', message.author.tag),locale.commands.find(e => e.name.includes('linkshorter'))[lang].message7.replace('$[링크]', res))
      message.channel.send(E)
    })
  } else {
    shorten.custom(args[0], args[1], function (res) {
      if (res.startsWith('error:')) return message.channel.send(`**${res}**`);
      let E = new Discord.MessageEmbed()
        .setTitle(locale.commands.find(e => e.name.includes('linkshorter'))[lang].message3)
        .setColor(0xff2f2f)
        .addField(locale.commands.find(e => e.name.includes('linkshorter'))[lang].message4.replace('$[사용자]', message.author.tag), locale.commands.find(e => e.name.includes('linkshorter'))[lang].message5.replace('$[링크]', res))
        .addField(locale.commands.find(e => e.name.includes('linkshorter'))[lang].message6.replace('$[사용자]', message.author.tag),locale.commands.find(e => e.name.includes('linkshorter'))[lang].message7.replace('$[링크]', res))
      message.channel.send(E)
    })

  }

}
