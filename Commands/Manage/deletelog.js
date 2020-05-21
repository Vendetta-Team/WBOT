const log = require("../log.json");
const fs = require('fs')
var logs = {
    "메세지삭제": 'mdc',
    "메세지수정": 'muc',
    "메세지다중삭제": 'mbc',
    "메세지반응삭제": 'mrr',
    "메세지반응전체삭제": 'mrra',
    "메세지반응삭제이모지": 'mrre',
    "메세지반응추가": 'mra',
    "역할생성": 'rcc',
    "역할수정": 'ruc',
    "역할삭제": 'rdc',
    "유저업데이트": 'uuc',
    "서버업데이트": 'guc',
    "초대링크생성": 'icc',
    "초대링크삭제": 'idc',
    "신규유저": 'gma',
    "퇴장유저": 'gmd',
    "서버유저업데이트": 'gmu',
    "웹훅": 'wuc',
    "보이스업데이트": 'vsu',
    "채널생성": 'ccc',
    "채널삭제": 'cdc',
    "채널수정": 'cuc',
    "유저밴": 'ubc',
    "유저킥": 'ukc',
    "전체로그": "all",
    "messagedelete": 'mdc',
    "messageupdate": 'muc',
    "messagebulkdelete": 'mbc',
    "messagereactionremove": 'mrr',
    "messagereactionremoveall": 'mrra',
    "messagereactionremoveemoji": 'mrre',
    "messagereactionadd": 'mra',
    "rolecreate": 'rcc',
    "roleupdate": 'ruc',
    "roledelete": 'rdc',
    "userupdate": 'uuc',
    "serverupdate": 'guc',
    "invitecreate": 'icc',
    "invitedelete": 'idc',
    "guildmemberadd": 'gma',
    "guildmemberdelete": 'gmd',
    "guildmemberupdate": 'gmu',
    "webhook": 'wuc',
    "voiceupdate": 'vsu',
    "channelcreate": 'ccc',
    "channeldelete": 'cdc',
    "channelupdate": 'cuc',
    "userban": 'ubc',
    "userkick": 'ukc',
    "all": "all"
}
exports.run = async (client, message, args, lang, me, log, autorole, locale, langage, memo, datas) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.reply(locale.commands.find(e => e.name.includes('setchannel'))[lang].message1);
    } else {
        if (!args) return message.reply(locale.commands.find(e => e.name.includes('setchannel'))[lang].message2);
        if (!logs[args[0]]) return message.reply(locale.commands.find(e => e.name.includes('setchannel'))[lang].message3).replace('[args[0]]', args[0])
        if (!log[message.guild.id][logs[args[0]]]) return message.reply(locale.commands.find(e => e.name.includes('deletelog'))[lang].message1)
        delete log[message.guild.id][logs[args[0]]]
        fs.writeFileSync("./Commands/log.json", JSON.stringify(log));
        message.reply(locale.commands.find(e => e.name.includes('deletelog'))[lang].message2)
    }
}