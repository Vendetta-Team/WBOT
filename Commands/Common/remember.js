const fs = require('fs')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    try {
        if (!datas.registed[message.author.id]) {
            message.reply('회원가입 되지 않은 유저입니다.')
        } else {
            var args2 = args.splice(1).join(" ")
            if (!args[0]) {
                message.reply(locale.commands.find(e => e.name.includes('remember'))[lang].message1);
                return;
            } else if (!args2) {
                message.reply(locale.commands.find(e => e.name.includes('remember'))[lang].message1);
                return;
            } else {
                if (!me.guild[message.guild.id]) {
                    console.log(1)
                    me.guild[message.guild.id] = { messages: {} }
                    fs.writeFileSync("./Commands/me.json", JSON.stringify(me));
                }
                if (me.guild[message.guild.id].messages[args[0]]) {
                    console.log(args)
                    if (me.guild[message.guild.id].messages[args[0]].reply.find(a => a.message === args2)) {
                        console.log(args)
                        message.reply(locale.commands.find(e => e.name.includes('remember'))[lang].message2)
                        return;
                    } else {
                        console.log(args.splice(1).join(" "))
                        me.guild[message.guild.id].messages[args[0]].reply.push({ "message": args2, "authorid": message.author.id })
                        fs.writeFileSync("./Commands/me.json", JSON.stringify(me));
                        message.reply(locale.commands.find(e => e.name.includes('remember'))[lang].message3)
                        return;
                    }
                } else {
                    me.guild[message.guild.id].messages[args[0]] = { "reply": [{ "message": args2, "authorid": message.author.id }] }
                    console.log(JSON.stringify(me))
                    fs.writeFileSync("./Commands/me.json", JSON.stringify(me));
                    message.reply(locale.commands.find(e => e.name.includes('remember'))[lang].message3)
                }
            }
        }
    } catch (e) {
        console.log(e)
        message.reply(locale.commands.find(e => e.name.includes('remember'))[lang].message4).replace('$[주인]', client.users.cache.get('490829962769727498').tag)
    }
}