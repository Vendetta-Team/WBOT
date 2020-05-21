const Discord = require('discord.js')
var SelfReloadJSON = require('self-reload-json');
const log = new SelfReloadJSON('./Commands/log.json');
const hastebin = require('hastebin-gen')
module.exports = async (client, guild) => {
    try {
        let guildCreateDelete = client.channels.cache.get("698050204238348299");

        let leaveEmbed = new Discord.MessageEmbed()
            .setTitle('서버나감')
            .setThumbnail(guild.iconURL)
            .addField('서버정보', `서버이름: **${guild.name}** \n서버아이디: **${guild.id}**`)

        guildCreateDelete.send(leaveEmbed);
    } catch (e) {

    }
}