exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    let fetched = datas.active.get(message.guild.id)
    let vol = fetched.dispatcher.volume
    if (!args[0]) return message.reply(locale.commands.find(e => e.name.includes('volume'))[lang].message1.replace('$[볼륨]',vol * 100))


    if (!fetched) return message.reply(locale.commands.find(e => e.name.includes('volume'))[lang].message2)
    if (message.member.voice.channel !== message.guild.me.voice.channel) return message.reply(locale.commands.find(e => e.name.includes('volume'))[lang].message3.replace('$[채널]',message.guild.me.voice.channel))
    if (isNaN(args[0]) || args[0] > 200 || args[0] < 0) return message.reply(locale.commands.find(e => e.name.includes('volume'))[lang].message4)
    args[0] = Math.round(args[0])
    if (vol * 100 == args[0]) return message.reply(locale.commands.find(e => e.name.includes('volume'))[lang].message5.replace('$[볼륨]',args[0]))
    fetched.dispatcher.setVolume(args[0] / 100);``
    // if (vol * 100 > args[0]) {
    //     const ven = args[0]
    //     console.log(1)
    //     for (i = args[0]; i >= vol * 100; i--) {
    //         fetched.dispatcher.setVolume(i / 100);
    //         console.log(i)
    //     }
    // } else {
    //     console.log(2)
    //     for (i = args[0]; i <= vol * 100; i++) {
    //         fetched.dispatcher.setVolume(i / 100);
    //         console.log(i)
    //     }
    // }
    message.reply(locale.commands.find(e => e.name.includes('volume'))[lang].message6.replace('$[볼륨1]',vol * 100).replace('$[볼륨2]',args[0]))
}