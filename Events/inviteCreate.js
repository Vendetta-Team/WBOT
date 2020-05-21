const Discord = require('discord.js')
var SelfReloadJSON = require('self-reload-json');
const log = new SelfReloadJSON('./Commands/log.json');
const hastebin = require('hastebin-gen')
module.exports = async (client, invite) => {
    try {
        if (log[invite.guild.id]) {
            if (log[invite.guild.id].icc) {
                let maxu = ""
                let maxd = ""
                if (invite.maxUses == 0) {
                    maxu = "무제한"
                } else {
                    maxu = invite.maxUses
                }
                if (invite.maxAge == 0) {
                    maxd = "무제한"
                } else {
                    maxd = invite.maxAge
                }
                const embed = new Discord.MessageEmbed()
                    .setTitle('초대링크 생성됨')
                    .addField('생성자', invite.inviter)
                    .addField('생성자 유저 태그', invite.inviter.tag)
                    .addField('생성자 DUID', invite.inviter.id)
                    .addField('생성코드', invite.code)
                    .addField('대상 채널', invite.channel)
                    .addField('생성된 링크', invite.url)
                    .addField('링크 사용가능수', maxu)
                    .addField('만료 기간', maxd)
                if (client.channels.cache.get(log[invite.guild.id].icc)) {
                    client.channels.cache.get(log[invite.guild.id].icc).send(embed)
                }
                if (log[invite.id].all) {
                    if (client.channels.cache.get(log[invite.guild.id].all)) {
                        client.channels.cache.get(log[invite.guild.id].all).send(embed)
                    }
                }
            }
        }
    } catch (e) {

    }
}