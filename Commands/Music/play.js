const ytdl = require('ytdl-core');

exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    if (!message.member.voice.channel) return message.reply(locale.commands.find(e => e.name.includes('play'))[lang].message1);
    if (message.guild.me.voice.channel) {
        if (message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.reply(locale.commands.find(e => e.name.includes('play'))[lang].message2).replace("$[채널]", message.guild.me.voice.channel)
    }
    console.log(args)
    if (!args[0]) return message.reply(locale.commands.find(e => e.name.includes('play'))[lang].message3);
    let video = await ytdl.validateURL(args[0]);
    if (!video) {
        let commandFile = require('./search engine');
        return commandFile.run(client, message, args, lang, me, log, autorole, locale, langage, memo, datas)
        // return message.reply('올바른 영상을 가져와주세요');
    }
    let info = await ytdl.getInfo(args[0]);
    // let connection = await message.member.voice.channel.join();
    // let dispatcher = await connection.play(ytdl(args[0], { filter: "audioonly" }));
    // message.reply(`현재 재생되는 곡 : ${info.title}`)
    let data = datas.active.get(message.guild.id) || {};
    if (!data.connection) data.connection = await message.member.voice.channel.join();
    if (!data.queue) data.queue = [];
    data.guildID = message.guild.id;
    data.volume = 10
    data.queue.push({
        title: info.title,
        request: message.author.id,
        thumbnail: `https://img.youtube.com/vi/${info.video_id}/maxresdefault.jpg`,
        length: info.length_seconds,
        url: args[0],
        author: info.author.name,
        messagechannel: message.channel.id
    })
    // console.log(locale)
    if (!data.dispatcher) play(client, datas, data, locale, lang);
    else {
        message.reply(locale.commands.find(e => e.name.includes('play'))[lang].message4.replace('$[제목]', info.title))
    }
    datas.active.set(message.guild.id, data);
}

async function play(client, datas, data, locale, lang) {
    console.log(data)
    client.channels.cache.get(data.queue[0].messagechannel).send(locale.commands.find(e => e.name.includes('play'))[lang].message5.replace("$[제목]", data.queue[0].title).replace("$[신청자]", client.guilds.cache.get(data.guildID).members.cache.get(data.queue[0].request).user.tag))
    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, { filter: 'audioonly' }));
    data.dispatcher.setVolume(data.volume / 100)
    data.dispatcher.guildID = data.guildID;
    data.dispatcher.once('finish', function () {
        end(client, datas, this, locale, lang);
    })
}

function end(client, datas, dispatcher, locale, lang) {
    // console.log(locale)
    let fetched = datas.active.get(dispatcher.guildID)
    let channel = fetched.queue[0].messagechannel
    fetched.queue.shift();
    if (fetched.queue.length > 0) {
        datas.active.set(dispatcher.guildID, fetched)
        // console.log(locale)
        play(client, datas, fetched, locale, lang);
        // play();
    } else {
        datas.active.delete(dispatcher.guildID);
        let vc = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
        if (vc) vc.leave();
        client.channels.cache.get(channel).send(locale.commands.find(e => e.name.includes('play'))[lang].message6)
    }
}