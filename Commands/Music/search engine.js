const search = require('yt-search');

exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    search(args.join(' '), function (err, res) {
        if (err) return message.reply(locale.commands.find(e => e.name.includes('play'))[lang].message7.replace("$[제작자]", client.users.cache.get('490829962769727498').tag))
        console.log(err)
        let videos = res.videos.slice(0, 10);
        if (videos.length == 0) return message.reply(locale.commands.find(e => e.name.includes('play'))[lang].message7.replace("$[제작자]", client.users.cache.get('490829962769727498').tag))
        let resp = '';
        for (var i in videos) {
            resp += `\n${parseInt(i) + 1}: ${videos[i].title}`
        }
        resp += `\n\n${locale.commands.find(e => e.name.includes('play'))[lang].message8.replace("$[수]", videos.length)}`
        message.reply(resp)
        const filter = (m) => {
            if (m.author.id === message.author.id) {
                if (m.content.startsWith("c") || m.content.startsWith("$재생") || m.content.startsWith("$play") || m.content.startsWith("C")) {
                    return true;
                } else if (!isNaN(m.content) && m.content < videos.length + 1 && m.content > 0 && m.author.id == message.author.id) {
                    return true;
                }
            }
        }
        const collector = message.channel.createMessageCollector(filter);
        collector.videos = videos;
        collector.once('collect', function (m) {
            if (m.author == message.author) {
                if (m.content.startsWith("$재생")) {
                    message.reply("검색을 취소합니다")
                    return
                }
                if (m.content.startsWith("$play")) {
                    message.reply("검색을 취소합니다")
                    return
                }
                if (m.content.startsWith("c")) {
                    message.reply("검색을 취소합니다")
                    return
                }
                if (m.content.startsWith("C")) {
                    message.reply("검색을 취소합니다")
                    return
                }
                let commandFile = require(`./play.js`)
                commandFile.run(client, message, [this.videos[parseInt(m.content) - 1].url], lang, me, log, autorole, locale, langage, memo, datas);
            }
        })
    })
}