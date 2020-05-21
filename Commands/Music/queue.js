const Discord = require('discord.js')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    let fetched = datas.active.get(message.guild.id);
    if (!fetched) return message.reply(locale.commands.find(e => e.name.includes('queue'))[lang].message1)
    let queue = fetched.queue;
    let nowplaying = queue[0];
    let resp = locale.commands.find(e => e.name.includes('queue'))[lang].message2.replace('$[현곡]', nowplaying.title).replace('$[신청자]', message.guild.members.cache.get(nowplaying.request).user.tag).replace('$[업로더]', nowplaying.author).replace('$[링크]', nowplaying.url)
    const embed = new Discord.MessageEmbed()
        .setTitle(locale.commands.find(e => e.name.includes('queue'))[lang].message3)
        .setThumbnail(nowplaying.thumbnail)
        .setDescription(resp)
        .setFooter(locale.commands.find(e => e.name.includes('queue'))[lang].message4.replace('$[수]', queue.length - 1))
    message.reply(embed)
}