const Discord = require('discord.js')
const version = "Beta"
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    if (!args[0]) {
        const locale = require('../commands.json')
        const ownertag = client.users.cache.get('490829962769727498').tag
        let common = ''
        let game = ''
        let pic = ''
        let manage = ''
        let support = ''
        let music = ''
        let event = ''
        locale.commands.forEach(x => {
            if (x.function == "Common") {
                common += x[lang].name + ", "
            } else if (x.function == "Game") {
                game += (x[lang].name) + ", "
            } else if (x.function == "Pic") {
                pic += (x[lang].name) + ", "
            } else if (x.function == "Manage") {
                manage += (x[lang].name) + ", "
            } else if (x.function == "Support") {
                support += (x[lang].name) + ", "
            } else if (x.function == "Music") {
                music += (x[lang].name) + ", "
            } else if (x.function == "Event") {
                event += (x[lang].name) + ", "
            }
        })
        var la = lang
        if (common.length == 0) {
            if (la == "kr") {
                common = "없음, "
            } else {
                common = "None, "
            }
        }
        if (game.length == 0) {
            if (la == "kr") {
                game = "없음, "
            } else {
                game = "None, "
            }
        }
        if (pic.length == 0) {
            if (la == "kr") {
                pic = "없음, "
            } else {
                pic = "None, "
            }
        }
        if (manage.length == 0) {
            if (la == "kr") {
                manage = "없음, "
            } else {
                manage = "None, "
            }
        }
        if (support.length == 0) {
            if (la == "kr") {
                support = "없음, "
            } else {
                support = "None, "
            }
        }
        if (music.length == 0) {
            if (la == "kr") {
                music = "없음, "
            } else {
                music = "None, "
            }
        }
        if (event.length == 0) {
            if (la == "kr") {
                event = "없음, "
            } else {
                event = "None, "
            }
        }
        var embed = new Discord.MessageEmbed()
            .setTitle(locale.help.title[lang])
            .setDescription(locale.help.description[lang].replace('$[버전]', version))
            .addField(locale.type.util[lang], common.slice(0, common.length - 2))
            .addField(locale.type.game[lang], game.slice(0, game.length - 2))
            .addField(locale.type.pic[lang], pic.slice(0, pic.length - 2))
            .addField(locale.type.manage[lang], manage.slice(0, manage.length - 2))
            .addField(locale.type.support[lang], support.slice(0, support.length - 2))
            .addField(locale.type.music[lang], music.slice(0, music.length - 2))
            .addField(locale.type.event[lang], event.slice(0, event.length - 2))
            .setFooter(locale.help.footer[lang].replace('$[주인태그]', ownertag))
        message.reply(embed)
    } else {
        delete require.cache[require.resolve('../commands.json')]
        delete require.cache[require.resolve('../langage.json')]
        const locale = require('../commands.json')
        const langage = require('../langage.json')
        const command = locale.commands.find(x => x.name.includes(args[0]))
        if (command) {
            const embed = new Discord.MessageEmbed()
                .setTitle(command[lang].name)
                .setDescription(command[lang].description)
            message.reply(embed)
        } else {
            message.reply(locale.help.notfound[lang].replace('$[명령어]', args.join(" ").slice(0, 20) + "..."))
        }
    }
}