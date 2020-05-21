const Discord = require('discord.js')
const moment = require('moment')
const hastebin = require("hastebin-gen");
let JSONFormatter = require("simple-json-formatter");
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    var user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else if (message.guild.members.cache.get(args[0])) {
        user = message.guild.members.cache.get(args[0])
    } else {
        user = message.author;
    }
    let roles = []
    message.member._roles.forEach(rr => {
        const r = message.guild.roles.cache.get(rr)
        roles.push({ "id": r.id, "name": r.name, "color": r.color, "hoist": r.hoist, "rawPosition": r.rawPosition, "permissions": r.permissions.serialize(false), "managed": r.managed, "mentionable": r.mentionable, "deleted": r.deleted })
    })
    let playing = []
    message.author.presence.activities.forEach(m => {
        playing.push(m)
    })
    hastebin(JSONFormatter.format(JSON.stringify(playing), "\t"), { url: "https://pastie.io/",extension: 'json' }).then(hasted => {
        hastebin(JSONFormatter.format(JSON.stringify(roles), "\t"), { url: "https://pastie.io/",extension: 'json' }).then(haste => {
            const member = message.guild.member(user);
            const embed = new Discord.MessageEmbed()
                .setTitle(locale.commands.find(e => e.name.includes('userinfo'))[lang].message1)
                .setAuthor(member.user.tag, member.user.displayAvatarURL())
                .setThumbnail(member.user.displayAvatarURL())
                .addField(locale.commands.find(e => e.name.includes('userinfo'))[lang].message2, `${user.id}`, true)
                .addField(locale.commands.find(e => e.name.includes('userinfo'))[lang].message3, `${member.nickname !== null ? `${member.nickname}` : `${user.username}`}`, true)
                .addField(locale.commands.find(e => e.name.includes('userinfo'))[lang].message4, `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
                .addField(locale.commands.find(e => e.name.includes('userinfo'))[lang].message5, `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
                .addField(locale.commands.find(e => e.name.includes('userinfo'))[lang].message6, member.user.bot, true)
                .addField(locale.commands.find(e => e.name.includes('userinfo'))[lang].message7, `${playing.length != 0 ? hasted : locale.commands.find(e => e.name.includes('userinfo'))[lang].message8}`, true)
                .addField(locale.commands.find(e => e.name.includes('userinfo'))[lang].message9, haste, true)
            message.reply(embed)
        })
    })
}