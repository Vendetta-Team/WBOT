const Discord = require('discord.js')
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(locale.commands.find(e => e.name.includes('autorole'))[lang].message1);
    if (!log[message.guild.id]) {
        message.reply(locale.commands.find(e => e.name.includes('logchannels'))[lang].message1)
        return;
    }else if(log[message.guild.id].length == 0){
        message.reply(locale.commands.find(e => e.name.includes('logchannels'))[lang].message1)
        return;
    }
    var embed = new Discord.MessageEmbed()
    .setTitle(locale.commands.find(e => e.name.includes('logchannels'))[lang].name)
    if (log[message.guild.id].mdc) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].mdc, `<#${message.guild.channels.cache.get(log[message.guild.id].mdc).id}>`)
    }
    if (log[message.guild.id].muc) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].muc, `<#${message.guild.channels.cache.get(log[message.guild.id].muc).id}>`)
    }
    if (log[message.guild.id].mbc) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].mbc, `<#${message.guild.channels.cache.get(log[message.guild.id].mbc).id}>`)
    }
    if (log[message.guild.id].mrr) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].mrr, `<#${message.guild.channels.cache.get(log[message.guild.id].mrr).id}>`)
    }
    if (log[message.guild.id].mrra) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].mrra, `<#${message.guild.channels.cache.get(log[message.guild.id].mrra).id}>`)
    }
    if (log[message.guild.id].mrre) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].mrre, `<#${message.guild.channels.cache.get(log[message.guild.id].mrre).id}>`)
    }
    if (log[message.guild.id].mra) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].mra, `<#${message.guild.channels.cache.get(log[message.guild.id].mra).id}>`)
    }
    if (log[message.guild.id].rcc) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].rcc, `<#${message.guild.channels.cache.get(log[message.guild.id].rcc).id}>`)
    }
    if (log[message.guild.id].ruc) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].ruc, `<#${message.guild.channels.cache.get(log[message.guild.id].ruc).id}>`)
    }
    if (log[message.guild.id].rdc) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].rdc, `<#${message.guild.channels.cache.get(log[message.guild.id].rdc).id}>`)
    }
    if (log[message.guild.id].uuc) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].uuc, `<#${message.guild.channels.cache.get(log[message.guild.id].uuc).id}>`)
    }
    if (log[message.guild.id].guc) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].guc, `<#${message.guild.channels.cache.get(log[message.guild.id].guc).id}>`)
    }
    if (log[message.guild.id].icc) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].icc, `<#${message.guild.channels.cache.get(log[message.guild.id].icc).id}>`)
    }
    if (log[message.guild.id].idc) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].idc, `<#${message.guild.channels.cache.get(log[message.guild.id].idc).id}>`)
    }
    if (log[message.guild.id].gma) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].gma, `<#${message.guild.channels.cache.get(log[message.guild.id].gma).id}>`)
    }
    if (log[message.guild.id].gmd) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].gmd, `<#${message.guild.channels.cache.get(log[message.guild.id].gmd).id}>`)
    }
    if (log[message.guild.id].gmu) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].gmu, `<#${message.guild.channels.cache.get(log[message.guild.id].gmu).id}>`)
    }
    if (log[message.guild.id].wuc) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].wuc, `<#${message.guild.channels.cache.get(log[message.guild.id].wuc).id}>`)
    }
    if (log[message.guild.id].vsu) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].vsu, `<#${message.guild.channels.cache.get(log[message.guild.id].vsu).id}>`)
    }
    if (log[message.guild.id].ccc) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].ccc, `<#${message.guild.channels.cache.get(log[message.guild.id].ccc).id}>`)
    }
    if (log[message.guild.id].cdc) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].cdc, `<#${message.guild.channels.cache.get(log[message.guild.id].cdc).id}>`)
    }
    if (log[message.guild.id].cuc) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].cuc, `<#${message.guild.channels.cache.get(log[message.guild.id].cuc).id}>`)
    }
    if (log[message.guild.id].ubc) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].ubc, `<#${message.guild.channels.cache.get(log[message.guild.id].ubc).id}>`)
    }
    if (log[message.guild.id].ukc) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].ukc, `<#${message.guild.channels.cache.get(log[message.guild.id].ukc).id}>`)
    }
    if (log[message.guild.id].all) {
        embed.addField(locale.commands.find(e => e.name.includes('logchannels'))[lang].all, `<#${message.guild.channels.cache.get(log[message.guild.id].all).id}>`)
    }
    message.author.send(embed)
    message.reply(locale.commands.find(e => e.name.includes('logchannels'))[lang].message2)
}