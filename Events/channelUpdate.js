const Discord = require('discord.js')
var SelfReloadJSON = require('self-reload-json');
const log = new SelfReloadJSON('./Commands/log.json');
const hastebin = require('hastebin-gen')
module.exports = async (client, oldChannel, newChannel) => {
    if (!log[oldChannel.guild.id]) return;
    if (log[oldChannel.guild.id].cuc) {
        hastebin(JSON.stringify(oldChannel.permissions), {url: "https://pastie.io/", extension: 'txt' }).then(async (haste) => {
            const entry = await oldChannel.guild.fetchAuditLogs({ type: 'CHANNEL_CREATE' }).then(audit => audit.entries.first())
            if (entry.createdTimestamp > (Date.now() - 5000)) {
                user = entry.executor
                userid = entry.executor.id
            } else {
                user = "오류"
                userid = "오류"
            }
            hastebin(JSON.stringify(entry.changes), { extension: 'txt' }).then(async (haste2) => {
                const embed = new Discord.MessageEmbed()
                    .setTitle('채널 수정 확인됨')
                    .addField('채널 수정자', user)
                    .addField('채널 수정자 유저 태그', user.tag)
                    .addField('채널 수정자 유저 아이디', userid)
                    .addField('채널', newChannel)
                    .addField('채널 이름', newChannel.name)
                    .addField('채널 권한', haste)
                    .addField('채널 아이디', channel.id)
                    .addField('채널 수정 내역', haste2)
                if (client.channels.cache.get(log[oldChannel.guild.id].cuc)) {
                    client.channels.cache.get(log[oldChannel.guild.id].cuc).send(embed)
                }
                if (log[oldChannel.guild.id].all) {
                    if (client.channels.cache.get(log[oldChannel.guild.id].all)) {
                        client.channels.cache.get(log[oldChannel.guild.id].all).send(embed)
                    }
                }
            })
        })
    }
}