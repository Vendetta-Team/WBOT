const Discord = require('discord.js')
const hastebin = require("hastebin-gen");
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    if (!datas.registed[message.author.id]) {
    } else {
        if (!me.guild[message.guild.id]) return message.reply(locale.commands.find(e => e.name.includes('customlist'))[lang].message1)
        if (!me.guild[message.guild.id].messages) return message.reply(locale.commands.find(e => e.name.includes('customlist'))[lang].message1)
        if (!me.guild[message.guild.id].messages.length == 0) return message.reply(locale.commands.find(e => e.name.includes('customlist'))[lang].message1)
        console.log(me.guild[message.guild.id].messages)
        let mes = ""
        for (let [key, value] of Object.entries(me.guild[message.guild.id].messages)) {
            console.log(`${key}: ${value}`);
            mes += `${key}: ${JSON.stringify(value)}\n`
        }
        console.log(mes)
        hastebin(mes, { url: "https://pastie.io/", extension: 'json' }).then(haste => {
            message.reply(haste)
        })
    }
}