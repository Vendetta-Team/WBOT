const { readdirSync } = require("fs");
module.exports = {
    name: ["리로드", "reload"],
    description: "관리자가 봇의 기능을 다시 불러올때 사용됩니다.",
    usage: "!리로드",
    type: "owner",
    async run(client, message, args, db) {
        let managers = await db.get("managers");
        if (!managers.includes(message.author.id)) return message.reply("당신은 이 명령어를 사용할 권한이 없습니다.");
        try {
            let m = await message.reply("명령어 리로드중..");
            const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
            await client.commands.clear();
            for (const file of commandFiles) {
                delete require.cache[require.resolve(`./${file}`)];
                const command = require(`../commands/${file}`);
                client.commands.set(command.name, command);
            }
            m.edit("모든 명령어를 리로드하였습니다.");
        } catch (e) {
            message.reply("리로드 하는데 실패했습니다.");
            console.log(e)
        }
    }
}