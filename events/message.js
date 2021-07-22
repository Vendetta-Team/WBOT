module.exports = {
    name: "message",
    async execute(message, client, db, config) {
        if (message.author.bot || !message.content.startsWith(config.prefix) || message.channel.type != "text") return;

        let args = message.content.slice(config.prefix.length).trim().split(/ +/),
            commandName = args.shift().toLowerCase(),
            command = client.commands.find(i => i.name.includes(commandName));
        if (!command) return;

        try {
            command.run(client, message, args, db, config);
        } catch (e) {
            console.error(e);
            message.reply('해당 명령어에 대해 버그가 발생했습니다!\n제작자에게 문의해주세요!');
        }
    }
}