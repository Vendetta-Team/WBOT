const Discord = require('discord.js')
var SelfReloadJSON = require('self-reload-json');
const log = new SelfReloadJSON('./Commands/log.json');
const hastebin = require('hastebin-gen')
module.exports = async (client, oldUser, newUser) => {
    try {
        client.guilds.cache.forEach(async g => {
            g.members.cache.forEach(async m => {
                try {
                    if (m.user.id == oldUser.id) {
                        if (oldUser.bot) return;
                        if (!log[g.id]) return;
                        if (log[g.id].uuc) {
                            let name = ""
                            let tag = ""
                            let avatar = ""
                            if (oldUser.username == newUser.username) {
                                name = "수정되지 않음"
                            } else {
                                name = `${oldUser.username}에서 ${newUser.username}으로 변경됨`
                            }
                            if (oldUser.tag == newUser.tag) {
                                tag = "수정되지 않음"
                            } else {
                                tag = `${oldUser.tag}에서 ${newUser.tag}로 변경됨`
                            }
                            if (oldUser.displayAvatarURL() == newUser.displayAvatarURL()) {
                                avatar = "수정되지 않음"
                            } else {
                                avatar = `${oldUser.displayAvatarURL()} 에서\n${newUser.displayAvatarURL()} 로 변경됨`
                            }
                            const embed = new Discord.MessageEmbed()
                                .setTitle('유저 업데이트 확인됨')
                                .addField('이름', name)
                                .addField('태그', tag)
                                .addField('프로필', avatar)
                            if (client.channels.cache.get(log[g.id].uuc)) {
                                client.channels.cache.get(log[g.id].uuc).send(embed)
                            }
                            if (log[g.id].all) {
                                if (client.channels.cache.get(log[g.id].all)) {
                                    client.channels.cache.get(log[g.id].all).send(embed)
                                }
                            }
                        }
                    }
                } catch (e) {

                }
            })
        })
    } catch (e) {
        // we can't catch to error
    }
}