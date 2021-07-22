const { MessageEmbed } = require("discord.js");

module.exports = {
    name: ["도움말", "도움", "ㄷㅇ", "help"],
    description: "이 메세지를 출력합니다.",
    usage: "!도움말 또는 !도움말 명령어",
    type: "common",
    async run(client, message, args) {
        if (args[0]) {
            let command = client.commands.find(i => i.name.includes(args[0]));
            if (!command) return message.reply("없는 명령어입니다.");
            let embed = new MessageEmbed()
                .setTitle(args[0])
                .setDescription(command.description)
                .addField("명령어 타입", command.type)
                .addField("명령어 사용법", command.usage)
                .addField("단축 명령어", command.name.join(","));
            message.reply({ embeds: [embed] });
        } else {
            let types = ["common", "game"];
            let embed = new MessageEmbed()
                .setTitle("봇 명령어 리스트")
                .setDescription("봇의 명령어 앞에 꼭 !를 붙여주세요!")
                .setAuthor(client.user.tag, client.user.displayAvatarURL())
                .setFooter("명령어에 대한 설명은 ![명령어]를 입력해주세요!", client.user.displayAvatarURL());

            for (i in types) {
                let commandNames = [];
                let commands = await client.commands.filter(c => c.type == types[i]);
                await commands.forEach(async k => {
                    await commandNames.push(k.name[0]);
                });
                embed.addField(types[i], commandNames.join(","));
            }

            message.reply({ embeds: [embed] });
        }
    }
}