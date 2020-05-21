const Discord = require('discord.js')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    if (message.author.id !== '490829962769727498') return;
    try {
        let codein = args.join(" ");
        let code = eval(codein);
        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.MessageEmbed()
            .setAuthor('이블')
            .setColor('RANDOM')
            .addField(':inbox_tray: 코드', `\`\`\`js\n${codein}\`\`\``)
            .addField(':outbox_tray: 출력', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed)
    } catch (e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}