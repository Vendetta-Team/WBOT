const Discord = require('discord.js')
var SelfReloadJSON = require('self-reload-json');
const log = new SelfReloadJSON('./Commands/log.json');
const hastebin = require('hastebin-gen')
const Canvas = require('canvas')
module.exports = async (client, member) => {
    try {
        if (log[member.guild.id]) {
            if (log[member.guild.id].gmd) {
                const canvas = Canvas.createCanvas(700, 250);
                const ctx = canvas.getContext('2d');
                Canvas.loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRVndab5Ij407u_6f2veLo_u1E_fG1hDTjxUSvoKQMfuiuZVxRh&usqp=CAU').then(async (image) => {
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    let length = ''
                    let name = ''
                    if (member.displayName.length >= 9) {
                        length = 8
                        name = member.displayName.slice(0, 7) + "..."
                    } else {
                        length = member.displayName.length
                        name = member.displayName
                    }
                    ctx.strokeStyle = '#74037b';
                    ctx.strokeRect(0, 0, canvas.width, canvas.height);

                    ctx.font = `50px sans-serif`;
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText("잘가요 ㅠㅠ", 300, 60);
                    ctx.globalAlpha = 1;

                    ctx.globalAlpha = 0.6;
                    ctx.fillStyle = 'black';
                    ctx.fillRect(0, 70, 750, 200);

                    ctx.globalAlpha = 1;
                    ctx.font = `${58 - ((length - 1) / 5.5)}px sans-serif`;
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText(name, canvas.width - (300 + (length * 20)), canvas.height / 1.8);

                    ctx.beginPath();
                    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.clip();

                    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
                    ctx.drawImage(avatar, 25, 25, 200, 200);

                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'Goomeye-image.png');

                    client.channels.cache.get(log[member.guild.id].gmd).send(member.author, attachment)
                })
            }
        }
    } catch (e) {

    }
}