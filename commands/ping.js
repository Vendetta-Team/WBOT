module.exports = {
    name: ["핑", "ㅍ", "ping"],
    description: "ping pong",
    usage: "!핑",
    type: "common",
    run(client, message) {
        message.reply("pong");
    }
}