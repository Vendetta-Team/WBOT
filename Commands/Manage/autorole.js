const Discord = require('discord.js')
const fs = require('fs')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(locale.commands.find(e => e.name.includes('autorole'))[lang].message1);
    if (!args) return message.reply(locale.commands.find(e => e.name.includes('autorole'))[lang].message2);
    if (!message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(" ").toLowerCase())) return message.reply(locale.commands.find(e => e.name.includes('autorole'))[lang].message3);
    if (!autorole[message.guild.id]) {
        autorole[message.guild.id] = {}
        autorole[message.guild.id].role = message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(" ").toLowerCase()).id
        fs.writeFileSync("./Commands/autorole.json", JSON.stringify(autorole));
        message.reply(`${args[0]}`)
    } else {
        const data = autorole[message.guild.id]
        data[autoroles[args[0]]] = message.mentions.channels.first().id
        fs.writeFileSync("./Commands/autorole.json", JSON.stringify(autorole));
        message.reply(`${args[0]}`)
    }
}