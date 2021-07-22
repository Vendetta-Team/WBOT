module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Bot is online\n\n${client.user.tag}`);
    },
};