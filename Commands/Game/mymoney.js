const Discord = require('discord.js')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    if (!datas[message.author.id]) {
        message.reply('!회원가입 을 먼저 해주세요!')
    } else {
        message.reply('당신의 돈은 ' + datas[message.author.id].money + "원 입니다!")
    }
}