const Discord = require('discord.js')
var SelfReloadJSON = require('self-reload-json');
const log = new SelfReloadJSON('./Commands/log.json');
const hastebin = require('hastebin-gen')
module.exports = async (client, oldMember, newMember, oldState, newState) => {
    try {
        console.log(oldMember.channelID)
        console.log(newMember.channelID)
        if (!oldState) {
            if (!log[oldMember.guild.id]) return;
            if (log[oldMember.guild.id].vsu) {
                if (newMember.channelID && !oldMember.channelID) {
                    var logembed = new Discord.MessageEmbed()
                        .setTitle('**유저 통화방 입장 감지**')
                        .setColor('#4c6aff')
                        .setDescription(`**${oldMember.member}님이 <#${newMember.channelID}>에 들어가셨습니다.**`)
                        .setTimestamp()
                    if (client.channels.cache.get(log[oldMember.guild.id].vsu)) {
                        client.channels.cache.get(log[oldMember.guild.id].vsu).send(logembed)
                    }
                    if (log[oldMember.guild.id].all) {
                        if (client.channels.cache.get(log[oldMember.guild.id].all)) {
                            client.channels.cache.get(log[oldMember.guild.id].all).send(logembed)
                        }
                    }
                } else if (newMember.member.voice == oldMember.channelID) {
                    var logembed2 = new Discord.MessageEmbed()
                        .setTitle('**유저 마이크,스피커 변경감지**')
                        .setColor('#4c6aff')
                        .setDescription(`**${oldMember.member}님의 마이크 또는 스피커 상태가 업데이트 되었습니다.**`)
                        .setTimestamp()
                    if (client.channels.cache.get(log[oldMember.guild.id].vsu)) {
                        client.channels.cache.get(log[oldMember.guild.id].vsu).send(logembed2)
                    }
                    if (log[oldMember.guild.id].all) {
                        if (client.channels.cache.get(log[oldMember.guild.id].all)) {
                            client.channels.cache.get(log[oldMember.guild.id].all).send(logembed2)
                        }
                    }
                } else if (!newMember.channelID && oldMember.channelID) {
                    var logembed2 = new Discord.MessageEmbed()
                        .setTitle('유저 통화방 퇴장 감지')
                        .setColor('#4c6aff')
                        .setDescription(`**${oldMember.member}님이 <#${oldMember.channelID}> 통화방을 나가셨습니다.**`)
                        .setTimestamp()
                    if (client.channels.cache.get(log[oldMember.guild.id].vsu)) {
                        client.channels.cache.get(log[oldMember.guild.id].vsu).send(logembed2)
                    }
                    if (log[oldMember.guild.id].all) {
                        if (client.channels.cache.get(log[oldMember.guild.id].all)) {
                            client.channels.cache.get(log[oldMember.guild.id].all).send(logembed2)
                        }
                    }
                } else if (newMember.channelID && oldMember.channelID && oldMember.channelID !== newMember.channelID) {
                    var logembed2 = new Discord.MessageEmbed()
                        .setTitle('유저 통화방 이동 감지')
                        .setColor('#4c6aff')
                        .setDescription(`**${oldMember.member}님이 <#${oldMember.channelID}> 에서 <#${newMember.channelID}>로 옮기셨습니다.**`)
                        .setTimestamp()
                    if (client.channels.cache.get(log[oldMember.guild.id].vsu)) {
                        client.channels.cache.get(log[oldMember.guild.id].vsu).send(logembed2)
                    }
                    if (log[oldMember.guild.id].all) {
                        if (client.channels.cache.get(log[oldMember.guild.id].all)) {
                            client.channels.cache.get(log[oldMember.guild.id].all).send(logembed2)
                        }
                    }
                }
            }
        }
    } catch (e) {

    }
}