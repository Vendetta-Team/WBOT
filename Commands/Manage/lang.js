const fs = require('fs')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(locale.commands.find(e => e.name.includes('lang'))[lang].message4);
    if (args[0].toLowerCase() == "kr") {
        if (lang == args[0]) {
            message.reply(locale.commands.find(e => e.name.includes('lang')).kr.message1)
        } else {
            langage[message.guild.id] = args[0].toLowerCase()
            fs.writeFileSync("./Commands/langage.json", JSON.stringify(langage));
            message.reply(locale.commands.find(e => e.name.includes('lang')).kr.message2)
        }
    } else if (args[0].toLowerCase() == "en") {
        if (lang == args[0]) {
            message.reply(locale.commands.find(e => e.name.includes('lang')).en.message1)
        } else {
            langage[message.guild.id] = args[0].toLowerCase()
            console.log(lang)
            fs.writeFileSync("./Commands/langage.json", JSON.stringify(langage));
            message.reply(locale.commands.find(e => e.name.includes('lang')).en.message2)
        }
    } else {
        message.reply(locale.commands.find(e => e.name.includes('lang'))[lang].message3)
    }
}