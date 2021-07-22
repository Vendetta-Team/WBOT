module.exports = {
    name: ["관리자추가", "ㄱㄹㅈㅊㄱ", "addmanager"],
    description: "봇에 대한 관리자 권한을 추가합니다.",
    type: "manager",
    usage: "!관리자추가 @유저#1234",
    async run(client, message, args, db, config) {
        try {
            let managers = await db.get("managers");
            if (config.owner == message.author.id || managers && managers.includes(message.author.id)) return message.reply("봇에 대한 관리 권한이 없습니다.");
            let member = message.mentions.members.cache.first();
            if (!member) return message.reply("봇의 관리자로 추가할 유저를 언급해주세요.");
            await db.push(`managers.${member.user.id}`, member.user.id);
            message.reply(`${member}님이 봇의 관리자로 추가되었습니다.`);
        } catch (e) {
            console.error(e);
            message.reply('해당 명령어에 대해 버그가 발생했습니다!\n제작자에게 문의해주세요!');
        }
    }
}