// https://discordjs.guide/
// https://discord.js.org/

const Discord = require("discord.js"),
    client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_INTEGRATIONS', 'GUILD_WEBHOOKS', 'GUILD_INVITES', 'GUILD_VOICE_STATES', 'GUILD_PRESENCES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING'] }),
    config = require("./config"),
    fs = require("fs"),
    { Database } = require("quickmongo"),
    db = new Database(config.mongodb ?? "mongodb://localhost/wbot"),
    commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')),
    eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

client.commands = new Discord.Collection();
(async () => {
    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client, db, config));
        }
    }
    console.log("Event is loaded");
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }
    console.log("Commnads is loaded");

    db.once("ready", async () => {
        console.log(`Database is loaded\nYour db size is ${await db.entries()}`);
        client.login(config.token);
    });
})();