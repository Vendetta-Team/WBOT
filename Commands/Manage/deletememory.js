const fs = require('fs')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    try {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(locale.commands.find(e => e.name.includes('deletememory'))[lang].message1);
        var args2 = args.splice(1).join(" ")
        if (!args[0]) {
            message.reply(locale.commands.find(e => e.name.includes('deletememory'))[lang].message2);
            return;
        } else if (!args2) {
            message.reply(locale.commands.find(e => e.name.includes('deletememory'))[lang].message2);
            return;
        } else {
            if (!me.guild[message.guild.id]) {
                me.guild[message.guild.id] = { messages: {} }
                fs.writeFileSync("./Commands/me.json", JSON.stringify(me));
                return
            }
            if (me.guild[message.guild.id].messages[args[0]]) {
                if (me.guild[message.guild.id].messages[args[0]].reply.find(a => a.message === args2)) {
                    if (me.guild[message.guild.id].messages[args[0]].reply.length == 1) {
                        delete me.guild[message.guild.id].messages[args[0]]
                        fs.writeFileSync("./Commands/me.json", JSON.stringify(me));
                        message.reply(locale.commands.find(e => e.name.includes('deletememory'))[lang].message3.replace('$[args[0]]', args[0]).replace('$[args2]', args2))
                        return
                    } else {
                        const idx = me.guild[message.guild.id].messages[args[0]].reply.findIndex(function (item) { return item.message === args2 })
                        if (idx > -1) me.guild[message.guild.id].messages[args[0]].reply.splice(idx, 1)
                        fs.writeFileSync("./Commands/me.json", JSON.stringify(me));
                        message.reply(locale.commands.find(e => e.name.includes('deletememory'))[lang].message3.replace('$[args[0]]', args[0]).replace('$[args2]', args2))
                        return
                    }
                } else {
                    message.reply(locale.commands.find(e => e.name.includes('deletememory'))[lang].message4)
                    return
                }
            } else {
                message.reply(locale.commands.find(e => e.name.includes('deletememory'))[lang].message5)
                return
            }
        }
    } catch (e) {
        message.reply(locale.commands.find(e => e.name.includes('remember'))[lang].message6.replace('$[주인]', client.users.cache.get('490829962769727498').tag))
    }
}