const Discord = require('discord.js')
const fs = require('fs')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    try {
        if (!datas.registed[message.author.id]) {
            const embed = new Discord.MessageEmbed()
                .setTitle('이용약관')
                .setDescription('아래 내용에 대해 동의하신다면 ✅를 클릭해주세요')
                .addField('1', '봇에 저장되는 기록은 `채팅에 대한 랜덤 경험치, 레벨, 직접 저장하신 메모`와 같이 직접 저장하신 기록은 암호화되어 서버에 기록됩니다.')
                .addField('2', '저장된 데이터는 서버장의 요청 또는 법적 처리를 위해 필요할 경우 제작자, 서버장이 열람 가능합니다.')
                .addField('3', '고의적으로 버그를 악용하다 적발시 블랙리스트에 추가될 수 있습니다.')
                .addField('4', '불법에 관련된 서버에 접속되신분은 무통보 블랙리스트에 추가될 수 있습니다.')
                .addField('5', 'Discord Tos, Discord Guide Line에 어긋된 행위가 적발시에도 블랙리스트에 추가될 수 있습니다.')
            message.reply(embed).then(m => {
                const filter = (reaction, user) => {
                    return ['✅'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                m.react('✅')
                m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                        m.delete()
                        login = datas.registed[message.author.id] = { "registed": true ,"date": new Date()}
                        fs.writeFileSync('./Commands/registed.json', JSON.stringify(login))
                        message.reply('회원가입을 진심으로 환영합니다.\n이제 WBOT의 기능을 마음것 사용하실수 있습니다.')
                    })
                    .catch(collected => {
                        message.reply('시간이 초과되어 가입을 취소합니다.')
                    });
            })
        } else {
            message.reply('당신은 이미 회원가입 되어있습니다.')
        }
    } catch (e) {
        message.reply(`에러 발생\n해당 내용을 캡쳐후 \`천마 [Vendetta]#4120\`에게 전송해주세요!\n${e}`)
    }
}