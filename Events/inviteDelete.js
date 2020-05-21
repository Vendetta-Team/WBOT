const Discord = require('discord.js')
var SelfReloadJSON = require('self-reload-json');
const log = new SelfReloadJSON('./Commands/log.json');
const hastebin = require('hastebin-gen')
module.exports = async (client, invite) => {
    try {
        if (log[invite.guild.id]) {
            if (log[invite.guild.id].idc) {
                const entry = await invite.guild.fetchAuditLogs({ type: 'INVITE_DELETE' }).then(audit => audit.entries.first())
                hastebin(JSON.stringify(entry), { url: "https://pastie.io/",extension: 'json' }).then(async (haste) => {
                    const embed = new Discord.MessageEmbed()
                        .setTitle('초대링크 삭제됨')
                        .addField('관련 내용', haste)
                        .setFooter('수정중입니다.')
                    if (client.channels.cache.get(log[invite.guild.id].idc)) {
                        client.channels.cache.get(log[invite.guild.id].idc).send(embed)
                    }
                    if (log[invite.id].all) {
                        if (client.channels.cache.get(log[invite.guild.id].all)) {
                            client.channels.cache.get(log[invite.guild.id].all).send(embed)
                        }
                    }
                })
            }
        }
    } catch (e) {

    }
}