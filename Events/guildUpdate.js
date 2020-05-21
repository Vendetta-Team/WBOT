const Discord = require('discord.js')
var SelfReloadJSON = require('self-reload-json');
const log = new SelfReloadJSON('./Commands/log.json');
const hastebin = require('hastebin-gen')
module.exports = async (client, oldGuild, newGuild) => {
    if (log[newGuild.id]) {
        if (log[newGuild.id].guc) {
            try {
                const entry = await oldGuild.fetchAuditLogs({ type: 'GUILD_UPDATE' }).then(audit => audit.entries.first())
                hastebin(JSON.stringify(entry), { url: "https://pastie.io/",extension: 'json' }).then(async (haste) => {
                    const embed = new Discord.MessageEmbed()
                        .setTitle('서버 변경 감지')
                        .addField('변경 내용', entry.changes)
                        .addField('변경자', executor)
                        .addField('변경자 유저 태그', executor.tag)
                        .addField('변경자 DUID', executor.id)
                    if (client.channels.cache.get(log[newGuild.id].guc)) {
                        client.channels.cache.get(log[newGuild.id].guc).send(embed)
                    }
                    if (log[newGuild.id].all) {
                        if (client.channels.cache.get(log[newGuild.id].all)) {
                            client.channels.cache.get(log[newGuild.id].all).send(embed)
                        }
                    }
                })
            } catch (e) {
            }
        }
    }
}