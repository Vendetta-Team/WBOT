const fs = require('fs')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(locale.commands.find(e => e.name.includes('autorole'))[lang].message1);
    if (!autorole[message.guild.id]) {
        autorole[message.guild.id] = {}
        fs.writeFileSync("./Commands/autorole.json", JSON.stringify(autorole));
        message.reply(locale.commands.find(e => e.name.includes('deleteautorole'))[lang].message1)
    } else {
        if (autorole[message.guild.id].length == 0) {
            message.reply(locale.commands.find(e => e.name.includes('deleteautorole'))[lang].message1)
        } else {
            autorole[message.guild.id] = {}
            fs.writeFileSync("./Commands/autorole.json", JSON.stringify(autorole));
            message.reply(locale.commands.find(e => e.name.includes('deleteautorole'))[lang].message2)
        }
    }
}