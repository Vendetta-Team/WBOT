const Discord = require('discord.js')
var SelfReloadJSON = require('self-reload-json');
const log = new SelfReloadJSON('./Commands/log.json');
const hastebin = require('hastebin-gen')
module.exports = async (client, oldMessage, newMessage) => {
    try {
        if (oldMessage.author.bot) return;
        if (newMessage.editedAt) {
            if (log[oldMessage.guild.id]) {
                if (log[oldMessage.guild.id].muc) {
                    if (oldMessage.content.length < 1024) {
                        if (oldMessage.reactions.message.content.length < 1024) {

                            const embed = new Discord.MessageEmbed()
                                .setTitle('메세지 수정 감지됨')
                                .addField('메세지 수정자', oldMessage.author.tag)
                                .addField('메세지 수정자 유저 태그', oldMessage.author.tag)
                                .addField('메세지 수정자 DUID', oldMessage.author.id)
                                .addField('메세지가 삭제된 채널', oldMessage.channel.name)
                                .addField('메세지가 삭제된 채널 아이디', oldMessage.channel.id)
                                .addField('전 메세지', oldMessage.content)
                                .addField('수정된 메세지', oldMessage.reactions.message.content)
                                .addField('메세지로 이동', `https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id}`)
                            if (client.channels.cache.get(log[oldMessage.guild.id].muc)) {
                                client.channels.cache.get(log[oldMessage.guild.id].muc).send(embed)
                            }
                            if (log[oldMessage.guild.id].all) {
                                if (client.channels.cache.get(log[oldMessage.guild.id].all)) {
                                    client.channels.cache.get(log[oldMessage.guild.id].all).send(embed)
                                }
                            }
                        } else {

                            const embed = new Discord.MessageEmbed()
                                .setTitle('메세지 수정 감지됨')
                                .addField('메세지 수정자', oldMessage.author.tag)
                                .addField('메세지 수정자 유저 태그', oldMessage.author.tag)
                                .addField('메세지 수정자 DUID', oldMessage.author.id)
                                .addField('메세지가 삭제된 채널', oldMessage.channel.name)
                                .addField('메세지가 삭제된 채널 아이디', oldMessage.channel.id)
                                .addField('전 메세지', oldMessage.content)
                                .addField('수정된 메세지', oldMessage.reactions.message.content)
                                .addField('메세지로 이동', `https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id}`)
                            if (client.channels.cache.get(log[oldMessage.guild.id].muc)) {
                                client.channels.cache.get(log[oldMessage.guild.id].muc).send(embed)
                            }
                            if (log[oldMessage.guild.id].all) {
                                if (client.channels.cache.get(log[oldMessage.guild.id].all)) {
                                    client.channels.cache.get(log[oldMessage.guild.id].all).send(embed)
                                }
                            }
                        }
                    } else {
                        if (oldMessage.reactions.message.content.length > 1024) {
                            hastebin(oldMessage.content, {url: "https://pastie.io/", extension: 'txt' }).then(haste => {
                                hastebin(oldMessage.reactions.message.content, {url: "https://pastie.io/", extension: 'txt' }).then(hasted => {
                                    const embed = new Discord.MessageEmbed()
                                        .setTitle('메세지 수정 감지됨')
                                        .addField('메세지 수정자', oldMessage.author.tag)
                                        .addField('메세지 수정자 유저 태그', oldMessage.author.tag)
                                        .addField('메세지 수정자 DUID', oldMessage.author.id)
                                        .addField('메세지가 삭제된 채널', oldMessage.channel.name)
                                        .addField('메세지가 삭제된 채널 아이디', oldMessage.channel.id)
                                        .addField('전 메세지', haste)
                                        .addField('수정된 메세지', hasted)
                                        .addField('메세지로 이동', `https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id}`)
                                    if (client.channels.cache.get(log[oldMessage.guild.id].muc)) {
                                        client.channels.cache.get(log[oldMessage.guild.id].muc).send(embed)
                                    }
                                    if (log[oldMessage.guild.id].all) {
                                        if (client.channels.cache.get(log[oldMessage.guild.id].all)) {
                                            client.channels.cache.get(log[oldMessage.guild.id].all).send(embed)
                                        }
                                    }
                                }).catch(error => {
                                    console.error(error);
                                });
                            }).catch(error => {
                                console.error(error);
                            });
                        } else {
                            hastebin(oldMessage.content, { url: "https://pastie.io/",extension: 'txt' }).then(hasted => {

                                const embed = new Discord.MessageEmbed()
                                    .setTitle('메세지 수정 감지됨')
                                    .addField('메세지 수정자', oldMessage.author.tag)
                                    .addField('메세지 수정자 유저 태그', oldMessage.author.tag)
                                    .addField('메세지 수정자 DUID', oldMessage.author.id)
                                    .addField('메세지가 삭제된 채널', oldMessage.channel.name)
                                    .addField('메세지가 삭제된 채널 아이디', oldMessage.channel.id)
                                    .addField('전 메세지', hasted)
                                    .addField('수정된 메세지', oldMessage.reactions.message.content)
                                    .addField('메세지로 이동', `https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id}`)
                                if (client.channels.cache.get(log[oldMessage.guild.id].muc)) {
                                    client.channels.cache.get(log[oldMessage.guild.id].muc).send(embed)
                                }
                                if (log[oldMessage.guild.id].all) {
                                    if (client.channels.cache.get(log[oldMessage.guild.id].all)) {
                                        client.channels.cache.get(log[oldMessage.guild.id].all).send(embed)
                                    }
                                }
                            }).catch(error => {
                                console.error(error);
                            });
                        }
                    }
                }
            }
        }
    } catch (e) {

    }
}