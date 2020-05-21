const Discord = require('discord.js')
const fs = require('fs')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(locale.commands.find(e => e.name.includes('autorole'))[lang].message1);
    if (!args[0]) {
        message.reply('정할 접두사를 함께 사용해주세요')
    } else {
        try{
            const data = datas.jprefix
            data[message.guild.id] = args[0]
            fs.writeFileSync("./Commands/prefix.json", JSON.stringify(data));
            message.reply('완료했습니다')
        }catch(e){
            message.reply(e)
        }
    }
}