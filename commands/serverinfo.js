const { MessageEmbed } = require("discord.js");

module.exports = {
    name: ["서버정보", "서버","serverinfo"],
    description: "서버의 정보를 보여줍니다.",
    usage: "!서버정보",
    type: "common",
    async run(client, message) {
        const filterLevels = {
            DISABLED: '꺼짐',
            MEMBERS_WITHOUT_ROLES: '역할 없음',
            ALL_MEMBERS: '모두'
        };

        const verificationLevels = {
            NONE: '없음',
            LOW: '낮음',
            MEDIUM: '중간',
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };

        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;

        const embed = new MessageEmbed()
            .setDescription(`Server Info`)
            .setColor('BLACK')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField('기본정보', `이름 : ${message.guild.name}\n서버 아이디 : ${message.guild.id}\n서버 생성일 : ${modules.moment(message.guild.createdTimestamp).format('YYYY년 MM월 DD일')} [${modules.moment(message.guild.createdTimestamp).fromNow()}]\n서버 주인 : ${message.guild.members.cache.get(message.guild.ownerID).user.tag} (${message.guild.ownerID})\n서버 부스트 티어 : ${message.guild.premiumTier ? `티어 ${message.guild.premiumTier}` : '없음'}\n서버 미디어 필터 : ${filterLevels[message.guild.explicitContentFilter]}\n서버 인증 필터 : ${verificationLevels[message.guild.verificationLevel]}`)
            .addField('통계', `서버 역할 수 : ${roles.length}\n서버 이모지 수 : ${emojis.size}\n서버 기본 이모지 수 : ${emojis.filter(emoji => !emoji.animated).size}\n서버 움짤 이미지 수 : ${emojis.filter(emoji => emoji.animated).size}\n서버 멤버 수 : ${message.guild.memberCount}\n서버 사람 수 : ${members.filter(member => !member.user.bot).size}\n서버 봇 수 : ${members.filter(member => member.user.bot).size}\n서버 채팅방 수 : ${channels.filter(channel => channel.type === 'text').size}\n서버 통화방 수 : ${channels.filter(channel => channel.type === 'voice').size}\n서버 부스트 수 : ${message.guild.premiumSubscriptionCount || '0'}`)
            .addField('유저 상태', `온라인 : ${members.filter(member => member.presence.status === 'online').size}\n자리 비움 : ${members.filter(member => member.presence.status === 'idle').size}\n다른 용무 중 : ${members.filter(member => member.presence.status === 'dnd').size}\n오프라인 : ${members.filter(member => member.presence.status === 'offline').size}`)
            .addField(`역할들 [${roles.length - 1}]`, roles.join(', '))
            .setTimestamp();
        message.reply({ embeds: [embed] });
    }
}