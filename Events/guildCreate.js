const Discord = require('discord.js')
var SelfReloadJSON = require('self-reload-json');
const log = new SelfReloadJSON('./Commands/log.json');
const hastebin = require('hastebin-gen')
module.exports = async (client, guild) => {
    try {
        const entry = await guild.fetchAuditLogs({ type: 'BOT_ADD' }).then(audit => audit.entries.first())
        if (entry.createdTimestamp > (Date.now() - 5000)) {
            user = entry.executor.tag
            userid = entry.executor.id
        } else {
            user = guild.owner.tag
            userid = guild.owner.id
        }
        let guildCreateChannel = client.channels.cache.get("698050204238348299");
        let joinEmbed = new Discord.MessageEmbed()
            .setTitle('서버추가됨')
            .setThumbnail(guild.iconURL)
            .setDescription('새로운 서버에 추가되었습니다')
            .addField('서버정보', `서버이름: **${guild.name}** \n 서버아이디: **${guild.id}**\n서버 OWNER: ${guild.owner}\n서버 OWNER id: ${guild.owner.id}`)

        guildCreateChannel.send(joinEmbed);
    } catch (e) {

    }
}
