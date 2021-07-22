module.exports = {
    name: ["뽑기", "ㅃㄱ","pick"],
    description: "당신이 입력한 리스트중 단 하나를 뽑습니다.",
    type: "game",
    usage: "!뽑기 리스트1, 리스트2",
    async run(client, message, args) {
        let list = args.join(" ").split(",");
        if (list.length < 1) return message.reply("리스트는 2개 이상어야만 합니다!");
        message.reply(`저의 선택은 ${list[Math.floor(Math.random() * list.length)]}`);
    }
}