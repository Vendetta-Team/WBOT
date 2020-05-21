exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    if (!message.guild.me.voice.channel) return message.reply(locale.commands.find(e => e.name.includes('stop'))[lang].message1)
    if (!message.member.voice.channel) return message.reply(locale.commands.find(e => e.name.includes('stop'))[lang].message2.replace('$[채널]',message.guild.me.voice.channel))
    if (message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.reply(locale.commands.find(e => e.name.includes('stop'))[lang].message3.replace('$[채널1]',message.member.voice.channel).replace('$[채널2]',message.guild.me.voice.channel))
    if (!message.member.permissions.has('ADMINSTRATOR')) return message.reply('❌')
    message.guild.me.voice.channel.leave();
    datas.active.delete(dispatcher.guildID)
    message.reply(locale.commands.find(e => e.name.includes('stop'))[lang].message4)
}