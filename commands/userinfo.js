const { MessageButton, MessageEmbed } = require("discord.js"),
    moment = require("moment-timezone")

module.exports = {
    name: ["유저정보", "유저", "ㅇㅈㅈㅂ", "userinfo"],
    description: "유저의 정보를 출력합니다.",
    usage: "!유저정보 또는 !유저정보 <@!822313589964406810> 또는\n!유저정보 822313589964406810 또는 유저정보 닉네임",
    type: "common",
    async run(client, message, args) {
        let show = async (user) => {
            if (!user) return message.reply("시간초과로 유저정보 검색이 자동 취소되었습니다.");
            let embed = new MessageEmbed()
                .setTitle("유저정보")
                .setAuthor(user.nickname ? `${user.nickname}[${user.user.tag}]` : user.user.tag, user.user.displayAvatarURL())
                .setColor(user.displayHexColor)
                .setThumbnail(user.user.displayAvatarURL())
                .addField("봇 여부", user.user.bot ? "O" : "X")
                .addField("유저 닉네임", user.nickname ?? "닉네임 없음")
                .addField("유저 접속일", moment(user.joinedAt).tz("Asia/Seoul").format("YYYY-MM-DD/HH:mm:ss"))
                .addField("유저 계정 생성일", moment(user.user.createdAt).tz("Asia/Seoul").format("YYYY-MM-DD/HH:mm:ss"));
            message.reply({ embeds: [embed] });
        }
        if (!args[0]) {
            show(message.member);
        } else if (message.guild.members.cache.get(message.mentions.users.first()?.id)) {
            show(message.guild.members.cache.get(message.mentions.users.first().id));
        } else if (message.guild.members.cache.get(args[0])) {
            show(message.guild.members.cache.get(args[0]));
        } else {
            let userlist = message.guild.members.cache.filter(i => i.nickname?.toLowerCase().includes(args.join(" ").toLowerCase()) ?? i.user.username.toLowerCase().includes(args.join(" ").toLowerCase()));
            if (!userlist.keyArray()[0]) return message.reply("없는 닉네임입니다.");
            let n = 0;
            if (userlist.keyArray().length == 1) return show(userlist.get(Array.from(userlist.keys())[0]));
            let val = userlist.get(userlist.keyArray()[n]);
            let embed = new MessageEmbed()
                .setTitle("닉네임 선택")
                .setDescription("아래 유저중 원하시는 유저를 선택해주세요!")
                .setThumbnail(val.user.displayAvatarURL())
                .addField("아이디", val.user.id)
                .addField("닉네임", val.nickname ? `${val.nickname}[${val.user.tag}]` : val.user.tag);
            let btns = [
                new MessageButton()
                    .setLabel("이전")
                    .setCustomID(`${message.id} back`)
                    .setStyle("PRIMARY")
                    .setEmoji("◀️")
                    .setDisabled(true),
                new MessageButton()
                    .setLabel("선택")
                    .setCustomID(`${message.id} confrim`)
                    .setStyle("SUCCESS")
                    .setEmoji("☑️"),
                new MessageButton()
                    .setLabel("다음")
                    .setCustomID(`${message.id} next`)
                    .setStyle("PRIMARY")
                    .setEmoji("▶️"),
                new MessageButton()
                    .setLabel("취소")
                    .setCustomID(`${message.id} delete`)
                    .setStyle("DANGER")
                    .setEmoji("🗑️")
            ]
            const filter = (interaction) => interaction.customID.startsWith(message.id);
            let m = await message.reply({ embeds: [embed], components: [btns] });
            let collector = await m.createMessageComponentInteractionCollector({ filter, time: 60000 });
            collector.on('collect', i => {
                if (i.user.id != message.author.id) return i.reply({ content: "당신은 이 메세지의 주인이 아닙니다!", ephemeral: true });
                let arg = i.customID.split(" ");
                if (arg[1] == "confrim") {
                    show(userlist.get(userlist.keyArray()[n]));
                    collector.stop();
                } else if (arg[1] == "delete") {
                    collector.stop();
                    return message.reply("유저정보 보기를 취소하셨습니다.");
                } else {
                    if (arg[1] == "next") {
                        if (userlist.keyArray().length - 1 == n) return;
                        n++
                        if (btns[0].disabled) {
                            btns[0].setDisabled(false);
                        }
                        if (userlist.keyArray().length - 1 == n) {
                            btns[2].setDisabled(true);
                        }
                    } else if (arg[1] == "back") {
                        if (n == 0) return;
                        n--
                        if (btns[2].disabled) {
                            btns[2].setDisabled(false);
                        }
                        if (n == 0) {
                            btns[0].setDisabled(true);
                        }
                    }
                    val = userlist.get(userlist.keyArray()[n]);
                    embed.thumbnail.url = val.user.displayAvatarURL();
                    embed.fields[0].value = val.user.id;
                    embed.fields[1].value = val.nickname ? `${val.nickname}[${val.user.tag}]` : val.user.tag;
                    m.edit({ embeds: [embed], components: [btns] });
                }
                i.deferUpdate();
            });
            collector.on('end', collected => {
                m.delete();
            });
        }
    }
}