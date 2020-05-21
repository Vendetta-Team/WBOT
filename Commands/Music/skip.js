exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    let fetched = datas.active.get(message.guild.id)
    if (!fetched) return message.reply(locale.commands.find(e => e.name.includes('skip'))[lang].message1)

    if (message.member.permissions.has('ADMINSTRATOR')) {
        await fetched.dispatcher.end()
        message.reply(locale.commands.find(e => e.name.includes('skip'))[lang].message2)
        return
    } else {
        if (message.member.user.id == fetched.queue[0].request) {
            await fetched.dispatcher.end()
            message.reply(locale.commands.find(e => e.name.includes('skip'))[lang].message3)
            return
        } else {
            message.reply(locale.commands.find(e => e.name.includes('skip'))[lang].message4)
        }
    }
}
