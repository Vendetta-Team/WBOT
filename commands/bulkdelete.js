module.exports = {
    name: ["채팅청소", "bulkdelete"],
    description: "관리자가 채팅을 청소할때 사용됩니다.",
    usage: "!채팅청소 숫자",
    type: "manager",
    async run(client, message, args) {
        // 길드 권한 확인
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("당신에게는 이 명령어를 실행할 권한이 없습니다.");
        // 값이 올바른지 확인
        if (!args[0] || isNaN(args[0]) || Number.isInteger(args[0])) return message.reply("알맞은 값을 입력해주세요.");
        if (0 < args[0] < 101) return message.reply("값은 0보다 크고 101보다 작아야 합니다.");
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]}개의 메세지를 지웠습니다!`);
        });
    }
}