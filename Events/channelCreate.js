const Discord = require('discord.js')
var SelfReloadJSON = require('self-reload-json');
const log = new SelfReloadJSON('./Commands/log.json');
const hastebin = require('hastebin-gen')
module.exports = async (client, channel) => {
    if (!log[channel.guild.id]) return;
    if (log[channel.guild.id].ccc) {
        hastebin(JSON.stringify(channel.permissions), { url: "https://pastie.io/", extension: 'txt' }).then(async (haste) => {
            const entry = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_CREATE' }).then(audit => audit.entries.first())
            if (entry.createdTimestamp > (Date.now() - 5000)) {
                user = entry.executor
                userid = entry.executor.id
            } else {
                user = "오류"
                userid = "오류"
            }
            const embed = new Discord.MessageEmbed()
                .setTitle('채널 생성 확인됨')
                .addField('채널 생성자', user)
                .addField('채널 생성자 유저 태그', user.tag)
                .addField('채널 생성자 유저 아이디', userid)
                .addField('채널 이름', channel.name)
                .addField('채널 권한', haste)
                .addField('채널 아이디', channel.id)
            if (client.channels.cache.get(log[channel.guild.id].ccc)) {
                client.channels.cache.get(log[channel.guild.id].ccc).send(embed)
            }
            if (log[channel.guild.id].all) {
                if (client.channels.cache.get(log[channel.guild.id].all)) {
                    client.channels.cache.get(log[channel.guild.id].all).send(embed)
                }
            }
        })
    }
}