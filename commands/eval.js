const { MessageEmbed } = require("discord.js");

module.exports = {
    name: ["이블", "eval"],
    description: "개발자가 봇에서 디버깅을 하는 용도로 사용됩니다.",
    usage: "!이블 코드",
    type: "owner",
    async run(client, message, args, modules) {
        let managers = await modules.settings.get("managers");
        if (!managers.includes(message.author.id)) return message.reply("당신에게는 이 명령어를 사용할 권한이 없습니다.");
        try {
            let ev = eval(args.join(" "));
            if (typeof ev !== "string")
                ev = require("util").inspect(ev);
            let embed = new MessageEmbed({
                title: "디버깅 완료",
                fields: [
                    {
                        "name": "입력된 코드",
                        "value": `\`\`\`js\n${args.join(" ")}\n\`\`\``
                    },
                    {
                        "name": "결과",
                        "value": `\`\`\`js\n${ev.length > 1000 ? ev.slice(0, 1000) : ev}\n\`\`\``
                    }
                ]
            });
            message.reply({ content: "완료.", embeds: [embed] });
        } catch (e) {
            message.reply(`실행불가능한 명령어\n\`\`\`js\n${e.toString().slice(1, 1000)}\n\`\`\``)
        }
    }
}