const Discord = require('discord.js')
var SelfReloadJSON = require('self-reload-json');
const log = new SelfReloadJSON('./Commands/log.json');
const hastebin = require('hastebin-gen')
module.exports = async (client, message) => {
    try {
        if (message.author.bot) return;
        if (log[message.guild.id]) {
            if (log[message.guild.id].mdc) {
                const entry = await message.guild.fetchAuditLogs({ type: 'MESSAGE_DELETE' }).then(audit => audit.entries.first())
                let user = ""
                if (entry.extra.channel.id === message.channel.id
                    && (entry.target.id === message.author.id)
                    && (entry.createdTimestamp > (Date.now() - 5000))
                    && (entry.extra.count >= 1)) {
                    user = entry.executor
                } else {
                    user = message.author
                }
                if (!message.attachments.size > 0) {
                    if (message.content.length == 0) {
                        const embed = new Discord.MessageEmbed()
                            .setTitle('🗑️ 메세지 삭제 감지됨')
                            .addField('삭제한 유저', user)
                            .addField('삭제한 유저 태그', user.tag)
                            .addField('메세지 삭제자 DUID', message.author.id)
                            .addField('메세지가 삭제된 채널', message.channel.name)
                            .addField('메세지가 삭제된 채널 아이디', message.channel.id)
                            .addField('메세지 아이디', message.id)
                            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
                        if (client.channels.cache.get(log[message.guild.id].mdc)) {
                            client.channels.cache.get(log[message.guild.id].mdc).send(embed)
                        }
                        if (log[message.guild.id].all) {
                            if (client.channels.cache.get(log[message.guild.id].all)) {
                                client.channels.cache.get(log[message.guild.id].all).send(embed)
                            }
                        }
                    } else if (message.content.length < 1024) {
                        const embed = new Discord.MessageEmbed()
                            .setTitle('🗑️ 메세지 삭제 감지됨')
                            .addField('삭제된 메세지', message)
                            .addField('삭제한 유저', user)
                            .addField('삭제한 유저 태그', user.tag)
                            .addField('메세지 삭제자 DUID', message.author.id)
                            .addField('메세지가 삭제된 채널', message.channel.name)
                            .addField('메세지가 삭제된 채널 아이디', message.channel.id)
                            .addField('메세지 아이디', message.id)
                            .setTimestamp()
                            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
                        if (client.channels.cache.get(log[message.guild.id].mdc)) {
                            client.channels.cache.get(log[message.guild.id].mdc).send(embed)
                        }
                        if (log[message.guild.id].all) {
                            if (client.channels.cache.get(log[message.guild.id].all)) {
                                client.channels.cache.get(log[message.guild.id].all).send(embed)
                            }
                        }
                    } else if (message.content.length > 1024) {
                        hastebin(message.content, { url: "https://pastie.io/",extension: 'txt' }).then(haste => {
                            const embed = new Discord.MessageEmbed()
                                .setTitle('🗑️ 메세지 삭제 감지됨')
                                .addField('삭제된 메세지', haste)
                                .addField('삭제한 유저', user)
                                .addField('삭제한 유저 태그', user.tag)
                                .addField('메세지 삭제자 DUID', message.author.id)
                                .addField('메세지가 삭제된 채널', message.channel.name)
                                .addField('메세지가 삭제된 채널 아이디', message.channel.id)
                                .addField('메세지 아이디', message.id)
                                .setFooter(`메세지 주인 : ${message.author.tag}/${message.author.id}`, message.author.displayAvatarURL())
                            if (client.channels.cache.get(log[message.guild.id].mdc)) {
                                client.channels.cache.get(log[message.guild.id].mdc).send(embed)
                            }
                            if (log[message.guild.id].all) {
                                if (client.channels.cache.get(log[message.guild.id].all)) {
                                    client.channels.cache.get(log[message.guild.id].all).send(embed)
                                }
                            }
                        }).catch(error => {
                            console.error(error)
                        })
                    }
                    return;
                } else {
                    var Attachment = (message.attachments).array();
                    if (message.content.length == 0) {
                        Attachment.forEach(function (attachment) {

                            const embed = new Discord.MessageEmbed()
                                .setTitle('🗑️ 메세지 삭제 감지됨')
                                .addField('삭제한 유저', user)
                                .addField('삭제한 유저 태그', user.tag)
                                .addField('메세지 삭제자 DUID', message.author.id)
                                .addField('메세지가 삭제된 채널', message.channel.name)
                                .addField('메세지가 삭제된 채널 아이디', message.channel.id)
                                .addField('메세지 아이디', message.id)
                                .addField("파일링크", `[클릭!](${attachment.proxyURL})`)
                                .setImage(attachment.proxyURL)
                                .setTimestamp()
                                .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
                            if (client.channels.cache.get(log[message.guild.id].mdc)) {
                                client.channels.cache.get(log[message.guild.id].mdc).send(embed)
                            }
                            if (log[message.guild.id].all) {
                                if (client.channels.cache.get(log[message.guild.id].all)) {
                                    client.channels.cache.get(log[message.guild.id].all).send(embed)
                                }
                            }
                        })
                    } else if (message.content.length < 1024) {
                        Attachment.forEach(function (attachment) {

                            const embed = new Discord.MessageEmbed()
                                .setTitle('🗑️ 메세지 삭제 감지됨')
                                .addField('삭제된 메세지', message)
                                .addField('삭제한 유저', user)
                                .addField('삭제한 유저 태그', user.tag)
                                .addField('메세지 삭제자 DUID', message.author.id)
                                .addField('메세지가 삭제된 채널', message.channel.name)
                                .addField('메세지가 삭제된 채널 아이디', message.channel.id)
                                .addField('메세지 아이디', message.id)
                                .addField("파일링크", `[클릭!](${attachment.proxyURL})`)
                                .setImage(attachment.proxyURL)
                                .setTimestamp()
                                .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
                            if (client.channels.cache.get(log[message.guild.id].mdc)) {
                                client.channels.cache.get(log[message.guild.id].mdc).send(embed)
                            }
                            if (log[message.guild.id].all) {
                                if (client.channels.cache.get(log[message.guild.id].all)) {
                                    client.channels.cache.get(log[message.guild.id].all).send(embed)
                                }
                            }
                        })
                    } else if (message.content.length > 1024) {
                        Attachment.forEach(function (attachment) {
                            hastebin(message.content, { url: "https://pastie.io/",extension: 'txt' }).then(haste => {

                                const embed = new Discord.MessageEmbed()
                                    .setTitle('🗑️ 메세지 삭제 감지됨')
                                    .addField('삭제된 메세지', haste)
                                    .addField('삭제한 유저', user)
                                    .addField('삭제한 유저 태그', user.tag)
                                    .addField('메세지 삭제자 DUID', message.author.id)
                                    .addField('메세지가 삭제된 채널', message.channel.name)
                                    .addField('메세지가 삭제된 채널 아이디', message.channel.id)
                                    .addField('메세지 아이디', message.id)
                                    .addField("파일링크", `[클릭!](${attachment.proxyURL})`)
                                    .setImage(attachment.proxyURL)
                                    .setTimestamp()
                                    .setFooter(`메세지 주인 : ${message.author.tag}/${message.author.id}`, message.author.displayAvatarURL())
                                if (client.channels.cache.get(log[message.guild.id].mdc)) {
                                    client.channels.cache.get(log[message.guild.id].mdc).send(embed)
                                }
                                if (log[message.guild.id].all) {
                                    if (client.channels.cache.get(log[message.guild.id].all)) {
                                        client.channels.cache.get(log[message.guild.id].all).send(embed)
                                    }
                                }
                            }).catch(error => {
                                console.error(error)
                            })
                        })
                    }
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
}