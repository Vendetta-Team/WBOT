const Discord = require('discord.js')
var SelfReloadJSON = require('self-reload-json');
const log = new SelfReloadJSON('./Commands/log.json');
const hastebin = require('hastebin-gen')
module.exports = async (client, role) => {
    try {
        if (!log[role.guild.id]) return;
        if (log[role.guild.id].rcc) {
            hastebin(JSON.stringify(role.permissions), { url: "https://pastie.io/",extension: 'txt' }).then(async (haste) => {
                const entry = await role.guild.fetchAuditLogs({ type: 'ROLE_DELETE' }).then(audit => audit.entries.first())
                if (entry.createdTimestamp > (Date.now() - 5000)) {
                    user = entry.executor
                    userid = entry.executor.id
                } else {
                    user = "오류"
                    userid = "오류"
                }
                console.log(entry)
                const embed = new Discord.MessageEmbed()
                    .setTitle('역할 삭제 확인됨')
                    .addField('역할 삭제자', user)
                    .addField('역할 삭제자 DUID', userid)
                    .addField('역할 삭제자 유저 태그', user.tag)
                    .addField('역할 이름', role.name)
                    .addField('역할 id', role.id)
                    .addField('역할 색상', role.hexColor)
                    .addField('역할 맨션 가능', role.mentionable)
                    .addField('역할 위치', role.rawPosition)
                    .addField('봇 역할', role.managed)
                    .addField('역할 권한', haste)
                if (client.channels.cache.get(log[role.guild.id].rdc)) {
                    client.channels.cache.get(log[role.guild.id].rdc).send(embed)
                }
                if (log[role.guild.id].all) {
                    if (client.channels.cache.get(log[role.guild.id].all)) {
                        client.channels.cache.get(log[role.guild.id].all).send(embed)
                    }
                }
            })
        }
    } catch (e) {

    }
}