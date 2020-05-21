const fs = require('fs')
const Discord = require('discord.js')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    if (!datas.registed[message.author.id]) {
        message.reply('회원가입 되지 않은')
    } else {
        if (!args[0]) {
            if (memo[message.author.id]) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(locale.commands.find(e => e.name.includes('memo'))[lang].message1)
                    .setDescription(memo[message.author.id])
                message.reply(embed)
            } else {
                message.reply(locale.commands.find(e => e.name.includes('memo'))[lang].message2)
            }
        } else {
            memo[message.author.id] = args.join(" ")
            fs.writeFileSync("./Commands/memo.json", JSON.stringify(memo));
            message.reply(locale.commands.find(e => e.name.includes('memo'))[lang].message3)
        }
    }
}