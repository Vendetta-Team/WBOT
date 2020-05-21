console.clear()
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const config = require('./config.json');
client._events = []
fs.readdir('./Events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const event = require(`./Events/${file}`)
        let eventName = file.split('.')[0]
        client.on(eventName, event.bind(null, client));
        client._events.push(eventName)
    })
})

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));
client.on('messageDeleteBulk', (messages) => {
    console.log('======================')
    console.log(messages)
    console.log('======================')
    delete require.cache[require.resolve('./Commands/log.json')]
    const log = require('./Commands/log.json')
    // if (log[messages.guild.id]) {

    // }
})
client.login(config.token)
