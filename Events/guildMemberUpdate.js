const Discord = require('discord.js')
var SelfReloadJSON = require('self-reload-json');
const log = new SelfReloadJSON('./Commands/log.json');
const hastebin = require('hastebin-gen')
module.exports = async (client, oldMember, newMember) => {
    if (log[newMember.guild.id]) {
        if (log[newMember.guild.id].gmu) {
            try {
                if (oldMember.member._roles.length == newMember.member._roles.length) {
                    var role = "변경된 역할 없음"
                    if (!oldMember.member.nickname) {
                        const nick = `${oldMember.user.username} 에서 ${newMember.member.nickname} 으로 변경`
                    } else {
                        const nick = `${newMember.member.nickname} 에서 ${oldMember.user.username} 으로 변경`
                    }
                    const embed = new Discord.MessageEmbed()
                        .setTitle('서버 유저 변경 확인됨')
                        .addField('변경된 유저', oldMember)
                        .addField('변경된 유저 태그', oldMember.user.tag)
                        .addField('변경된 유저 DUID', oldMember.user.id)
                        .addField('역할', role)
                        .addField('닉네임', nick)
                    if (client.channels.cache.get(log[oldMember.guild.id].gmu)) {
                        client.channels.cache.get(log[oldMember.guild.id].gmu).send(embed)
                    }
                    if (log[oldMember.guild.id].all) {
                        if (client.channels.cache.get(log[oldMember.guild.id].all)) {
                            client.channels.cache.get(log[oldMember.guild.id].all).send(embed)
                        }
                    }
                } else {
                    let oldMemberrole = oldMember.member._roles
                    let newMemberrole = newMember.member._roles
                    if (oldMember.member._roles.length > newMember.member._roles.length) {
                        if (!oldMember.member.nickname) {
                            const nick = `${oldMember.user.username} 에서 ${newMember.member.nickname} 으로 변경`
                        } else {
                            const nick = `${newMember.member.nickname} 에서 ${oldMember.user.username} 으로 변경`
                        }
                        newMemberrole.forEach(v => {
                            const idx = newMemberrole.indexOf(v)
                            if (idx > -1) newMemberrole.splice(idx, 1)
                        })
                        const embed = new Discord.MessageEmbed()
                            .setTitle('서버 유저 변경 확인됨')
                            .addField('변경된 유저', oldMember)
                            .addField('변경된 유저 태그', oldMember.user.tag)
                            .addField('변경된 유저 DUID', oldMember.user.id)
                            .addField('역할', role)
                            .addField('닉네임', nick)
                        if (client.channels.cache.get(log[oldMember.guild.id].gmu)) {
                            client.channels.cache.get(log[oldMember.guild.id].gmu).send(embed)
                        }
                        if (log[oldMember.guild.id].all) {
                            if (client.channels.cache.get(log[oldMember.guild.id].all)) {
                                client.channels.cache.get(log[oldMember.guild.id].all).send(embed)
                            }
                        }
                    } else {
                        oldMemberrole.forEach(v => {
                            const idx = oldMemberrole.indexOf(v)
                            if (idx > -1) oldMemberrole.splice(idx, 1)
                        })
                        if (!oldMember.member.nickname) {
                            const nick = `${oldMember.user.username} 에서 ${newMember.member.nickname} 으로 변경`
                        } else {
                            const nick = `${newMember.member.nickname} 에서 ${oldMember.user.username} 으로 변경`
                        }
                        newMemberrole.forEach(v => {
                            const idx = newMemberrole.indexOf(v)
                            if (idx > -1) newMemberrole.splice(idx, 1)
                        })
                        const embed = new Discord.MessageEmbed()
                            .setTitle('서버 유저 변경 확인됨')
                            .addField('변경된 유저', oldMember)
                            .addField('변경된 유저 태그', oldMember.user.tag)
                            .addField('변경된 유저 DUID', oldMember.user.id)
                            .addField('역할', role)
                            .addField('닉네임', nick)
                        if (client.channels.cache.get(log[oldMember.guild.id].gmu)) {
                            client.channels.cache.get(log[oldMember.guild.id].gmu).send(embed)
                        }
                        if (log[oldMember.guild.id].all) {
                            if (client.channels.cache.get(log[oldMember.guild.id].all)) {
                                client.channels.cache.get(log[oldMember.guild.id].all).send(embed)
                            }
                        }
                    }
                }
            } catch (e) {

            }
        }
    }
}