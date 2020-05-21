locale.commands.find(e => e.name.includes('dice'))[lang].message1
const Discord = require('discord.js')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    if (!datas[message.author.id]) {
        message.reply('!회원가입 을 먼저 해주세요!')
    } else {
        if (data[message.author.id].money == 0) {
            message.reply('당신은 이 기능을 사용할수 없어요..\n!내돈 을 봐요..\n왜 안될까요..')
        } else {
            var allin = Math.floor((Math.random() * 2) + 1);
            let ments = [
                "뭐가 나오려나..",
                "두근두근..",
                "쓰읍 사기는 아니겠지!?",
                "따리리리링~"
            ]
            var ment = Math.floor((Math.random() * ments.length));
            message.channel.send(ments[ment]).then(msg => {
                setTimeout(() => {
                    if (allin == 1) {
                        msg.edit(`성공입니다!\n${message.author}님의 돈은 이제 2배입니다!`)
                        data[message.author.id].money = data[message.author.id].money * 2
                        fs.writeFileSync("./data.json", JSON.stringify(data));
                    } else {
                        msg.edit(`실패입니다 ㅠㅠ\n${message.author}님은 이제 돈이..ㅠㅠㅠㅠㅠ`)
                        data[message.author.id].money = 0
                        fs.writeFileSync("./data.json", JSON.stringify(data));
                    }
                }, 2000);
            })
        }
    }
}