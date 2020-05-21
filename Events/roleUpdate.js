const Discord = require('discord.js')
var SelfReloadJSON = require('self-reload-json');
const log = new SelfReloadJSON('./Commands/log.json');
const hastebin = require('hastebin-gen')
module.exports = async (client, oldRole) => {
    try {
        if (!log[oldRole.guild.id]) return;
        if (log[oldRole.guild.id].ruc) {
            const entry = await oldRole.guild.fetchAuditLogs({ type: 'ROLE_UPDATE' }).then(audit => audit.entries.first())
            if (entry.createdTimestamp > (Date.now() - 5000)) {
                user = entry.executor
                userid = entry.executor.id
            } else {
                user = "오류"
                userid = "오류"
            }
            hastebin(JSON.stringify(entry.changes), { url: "https://pastie.io/",extension: 'txt' }).then(async (haste) => {
                console.log(entry)
                const embed = new Discord.MessageEmbed()
                    .setTitle('역할 수정 확인됨')
                    .addField('역할 수정자', user)
                    .addField('역할 수정자 유저 태그', user.tag)
                    .addField('역할 수정자 DUID', userid)
                    .addField('역할 id', oldRole.id)
                    .addField('역할 수정 내용', haste)
                if (client.channels.cache.get(log[oldRole.guild.id].ruc)) {
                    client.channels.cache.get(log[oldRole.guild.id].ruc).send(embed)
                }
                if (log[oldRole.guild.id].all) {
                    if (client.channels.cache.get(log[oldRole.guild.id].all)) {
                        client.channels.cache.get(log[oldRole.guild.id].all).send(embed)
                    }
                }
            })
        }
    } catch (e) {

    }
}