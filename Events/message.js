const Discord = require('discord.js')
const config = require('../config.json')
var SelfReloadJSON = require('self-reload-json');
const locale = new SelfReloadJSON('./Commands/commands.json')
const langage = new SelfReloadJSON('./Commands/langage.json')
const log = new SelfReloadJSON('./Commands/log.json');
const me = new SelfReloadJSON("./Commands/me.json");
const autorole = new SelfReloadJSON('./Commands/autorole.json')
const memo = new SelfReloadJSON('./Commands/memo.json')
const xp = new SelfReloadJSON('./Commands/xp.json')
const badword = new SelfReloadJSON('./Commands/badword.json')
const blacklist = new SelfReloadJSON('./Commands/blacklist.json')
const members = new SelfReloadJSON('./Commands/registed.json')
const jprefix = new SelfReloadJSON('./Commands/prefix.json')
const active = new Map();
module.exports = async (client, message) => {
    if (blacklist[message.author.id] == true) return;
    if (message.author.bot) return;
    if (message.channel.type == 'dm') {
        const embed = new Discord.MessageEmbed()
            .setTitle(message.author.id)
            .setDescription(message.content)
        client.channels.cache.get('698050204238348299').send(embed)
        message.reply('봇 제작자에게 문의가 전송되었습니다.\n유저아이디와 닉네임이 함께 전송되었으며\n답장이 올때까지 대기 부탁드립니다.')
        return;
    }
    if (badword[message.guild.id]) {
        const bad = badword[message.guild.id]
        if (bad.some(word => message.content.toLowerCase().includes(word))) {
            message.delete();
            message.reply('서버에서 허가되지 않은 채팅이 확인되어 자동삭제되었습니다.')
            return;
        }
    }

    if (me.guild[message.guild.id]) {
        if (me.guild[message.guild.id].messages[message.content]) {
            console.log(me.guild[message.guild.id].messages[message.content].reply)
            var random = Math.floor((Math.random() * me.guild[message.guild.id].messages[message.content].reply.length));
            let embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
                .setDescription(me.guild[message.guild.id].messages[message.content].reply[random].message)
                .setFooter(`가르친 유저 아이디 : ${me.guild[message.guild.id].messages[message.content].reply[random].authorid}`)
            message.channel.send(embed)
        }
    }

    if (!xp[message.guild.id]) {
        xp[message.guild.id] = {
            "leveling": false, "users": {}
        }
    } else if (xp[message.guild.id].leveling == true) {
        if (!xp[message.guild.id].users[message.author.id]) {
            xp[message.guild.id].users[message.author.id] = {
                "level": 1, "xp": 0
            }
        } else {
            xp[message.guild.id].users[message.author.id].xp += Math.floor(Math.random() * (5 - 1) + 1)
        }
    }
    let prefix = ""
    if (jprefix[message.guild.id]) {
        prefix = jprefix[message.guild.id]
    } else {
        prefix = "$"
    }

    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        let lang = ''
        if (!langage[message.guild.id]) {
            lang = 'en'
        } else {
            lang = langage[message.guild.id]
        }
        let datas = {
            ownerID: "",
            active: active,
            prefix: jprefix,
            members: members
        }
        if (!locale.commands.find(e => e.name.includes(command))) return;
        let commandFile = require(`../Commands/${locale.commands.find(e => e.name.includes(command)).function}/${locale.commands.find(e => e.name.includes(command)).command}.js`);
        commandFile.run(client, message, args, lang, me, log, autorole, locale, langage, memo, datas);
    } catch (err) {
        console.log(err)
    }
}