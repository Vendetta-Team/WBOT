const Discord = require('discord.js')
const hastebin = require("hastebin-gen");
let JSONFormatter = require("simple-json-formatter");
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    let roles = []
    message.guild.roles.cache.forEach(r => {
        roles.push({ "id": r.id, "name": r.name, "color": r.color, "hoist": r.hoist, "rawPosition": r.rawPosition, "permissions": r.permissions.serialize(false), "managed": r.managed, "mentionable": r.mentionable, "deleted": r.deleted })
    })
    hastebin(JSONFormatter.format(JSON.stringify(roles), "\t"), {url: "https://pastie.io/", extension: 'json' }).then(haste => {
        let day = message.guild.createdAt.getDate()
        let month = 1 + message.guild.createdAt.getMonth()
        let year = message.guild.createdAt.getFullYear()
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setFooter(`${locale.commands.find(e => e.name.includes('serverinfo'))[lang].message1} • ${year}.${month}.${day}\n${locale.commands.find(e => e.name.includes('serverinfo'))[lang].message2} • ${message.member.joinedAt.getFullYear()}.${1 + message.member.joinedAt.getMonth()}.${message.member.joinedAt.getDate()}`)
            .setColor("#7289DA")
            .setThumbnail(message.guild.iconURL())
            .addField(locale.commands.find(e => e.name.includes('serverinfo'))[lang].message3, message.guild.id, true)
            .addField(locale.commands.find(e => e.name.includes('serverinfo'))[lang].message4, message.guild.name, true)
            .addField(locale.commands.find(e => e.name.includes('serverinfo'))[lang].message5, message.guild.owner.user.tag, true)
            .addField(locale.commands.find(e => e.name.includes('serverinfo'))[lang].message6, message.guild.region, true)
            .addField(locale.commands.find(e => e.name.includes('serverinfo'))[lang].message7, message.guild.channels.cache.size, true)
            .addField(locale.commands.find(e => e.name.includes('serverinfo'))[lang].message8, message.guild.memberCount, true)
            .addField(locale.commands.find(e => e.name.includes('serverinfo'))[lang].message9, message.guild.memberCount - message.guild.members.cache.filter(m => m.user.bot).size, true)
            .addField(locale.commands.find(e => e.name.includes('serverinfo'))[lang].message10, message.guild.members.cache.filter(m => m.user.bot).size, true)
            .addField(locale.commands.find(e => e.name.includes('serverinfo'))[lang].message11, `**${locale.commands.find(e => e.name.includes('serverinfo'))[lang].message12} : ${message.guild.members.cache.filter(o => o.presence.status === 'online').size}**\n**${locale.commands.find(e => e.name.includes('serverinfo'))[lang].message13} : ${message.guild.members.cache.filter(i => i.presence.status === 'idle').size}**\n**${locale.commands.find(e => e.name.includes('serverinfo'))[lang].message14} : ${message.guild.members.cache.filter(dnd => dnd.presence.status === 'dnd').size}**\n**${locale.commands.find(e => e.name.includes('serverinfo'))[lang].message15} : ${message.guild.members.cache.filter(off => off.presence.status === 'offline').size}**\n**트위치 스트리밍 : ${message.guild.members.cache.filter(s => s.presence.status === 'streaming').size}**`)
            .addField(locale.commands.find(e => e.name.includes('serverinfo'))[lang].message16, message.guild.afkChannel, true)
            .addField(locale.commands.find(e => e.name.includes('serverinfo'))[lang].message17, message.channel.guild.emojis.cache.size, true)
            .addField(locale.commands.find(e => e.name.includes('serverinfo'))[lang].message18, message.guild.roles.cache.size, true)
            .addField(locale.commands.find(e => e.name.includes('serverinfo'))[lang].message19, haste, true);
        message.author.send(embed);
    })
    message.reply(locale.commands.find(e => e.name.includes('serverinfo'))[lang].message20)

}
