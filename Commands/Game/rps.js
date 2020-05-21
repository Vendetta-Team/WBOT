const Discord = require(`discord.js`);
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, ops) => {
  let 바위2 = locale.commands.find(e => e.name.includes('rps'))[lang].list1
  let 바위1 = Math.floor(Math.random() * 바위2.length);
  let 보2 = locale.commands.find(e => e.name.includes('rps'))[lang].list2
  let 보1 = Math.floor(Math.random() * 보2.length);
  let 가위2 = locale.commands.find(e => e.name.includes('rps'))[lang].list3
  let 가위1 = Math.floor(Math.random() * 가위2.length);
  let 바위 = new Discord.MessageEmbed()
    .setAuthor(locale.commands.find(e => e.name.includes('rps'))[lang].message1)
    .setColor(`RANDOM`)
    .addField(locale.commands.find(e => e.name.includes('rps'))[lang].message2, `${args[0]}`)
    .addField(locale.commands.find(e => e.name.includes('rps'))[lang].message3, 바위2[바위1])

  let 보 = new Discord.MessageEmbed()
    .setAuthor(locale.commands.find(e => e.name.includes('rps'))[lang].message1)
    .setColor(`RANDOM`)
    .addField(locale.commands.find(e => e.name.includes('rps'))[lang].message2, `${args[0]}`)
    .addField(locale.commands.find(e => e.name.includes('rps'))[lang].message3, 보2[보1])

  let 가위 = new Discord.MessageEmbed()
    .setAuthor(locale.commands.find(e => e.name.includes('rps'))[lang].message1)
    .setColor(`RANDOM`)
    .addField(locale.commands.find(e => e.name.includes('rps'))[lang].message2, `${args[0]}`)
    .addField(locale.commands.find(e => e.name.includes('rps'))[lang].message3, 가위2[가위1])

  if(!args[0]){
    message.reply(locale.commands.find(e => e.name.includes('rps'))[lang].message4)
    return;
}
  if (args[0].toLowerCase() == locale.commands.find(e => e.name.includes('rps'))[lang].바위) {
    message.channel.send(바위)
    return;
  }
  if (args[0].toLowerCase() == locale.commands.find(e => e.name.includes('rps'))[lang].보) {
    message.channel.send(보)
    return;
  }
  if (args[0].toLowerCase() == locale.commands.find(e => e.name.includes('rps'))[lang].가위) {
    message.channel.send(가위)
    return;
  } else {
    message.reply(locale.commands.find(e => e.name.includes('rps'))[lang].message4)
    return;
  }
}
