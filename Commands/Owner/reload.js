const Discord = require('discord.js');
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {

    if (message.author.id !== '490829962769727498') { message.reply(locale.commands.find(e => e.name.includes('reload'))[lang].message1);
    let report = client.channels.get("488716854957703169");
    let embed = new Discord.RichEmbed()
    .setTimestamp()
    .setTitle("일반인의 관리자 커맨드 사용이 감지되었습니다.")
    .addField(`보낸이:`,`<@${message.author.id}>`)
    .addField(`보낸이의 아이디:`, `${message.author.id}`)
    .setThumbnail(message.author.displayAvatarURL)
    .addField(`사용한 커맨드: `,message.content)
    .setFooter(`관리진 메세지 | 관리자 커맨드`)
    report.send(embed)
    return
}
    try {
        delete require.cache[require.resolve(`./${args[0]}.js`)];
    } catch (e) {
        message.channel.send(`리로드 실패 : ${args[0]}.js`);
        return
    }

    message.channel.send(`**리로드 성공:** ${args[0]}.js`);


}
