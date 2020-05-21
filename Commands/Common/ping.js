const Discord = require('discord.js')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    const m = await message.channel.send(locale.commands.find(e => e.name.includes('ping'))[lang].message1).then(async msg => {
        msg.edit(locale.commands.find(e => e.name.includes('ping'))[lang].message2).then(ms => {
            msg.edit(locale.commands.find(e => e.name.includes('ping'))[lang].message3.replace('$[속도]', ms.editedTimestamp - message.createdTimestamp).replace('$[유저]', message.author).replace('$[api]', client.ws.ping))
        })
    })
}