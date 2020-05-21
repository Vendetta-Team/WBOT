const Discord = require('discord.js')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    if (!datas[message.author.id]) {
        message.reply('!회원가입 을 먼저 해주세요!')
    } else {
        if (datas[message.author.id].moneyget == null) {
            datas[message.author.id].money += 10000
            datas[message.author.id].moneyget = moment().valueOf()
            fs.writeFileSync("./data.json", JSON.stringify(data));
            message.reply(`당신의 돈은 이제' + data[message.author.id].money + "원 입니다!`)
        } else if (datas[message.author.id].moneyget + 3600000 < moment().valueOf()) {
            datas[message.author.id].money += 10000
            datas[message.author.id].moneyget = moment().valueOf()
            fs.writeFileSync("./data.json", JSON.stringify(data));
            message.reply(`당신의 돈은 이제` + datas[message.author.id].money + "원 입니다!")
        } else {
            message.reply(`당신은 아직 이 기능을 쓸수 없어요..(명령어 사용시간을 기준으로 1시간 뒤에 사용이 가능합니다!)`)
        }
    }
}