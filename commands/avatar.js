const Discord = require("discord.js");

const execute = async(bot, message, args) => {
    if (args.length == 1) {
        url = message.member.user.avatarURL("png", false, 64);
        title = "L'avatar de " + message.member.user.username;
        doEmbed(url, title, message);
    } else {
        if (args.length == 2) {
            const member = message.guild.member(message.mentions.users.first());
            if (member) {
                if (member.user.avatarURL("png", false, 64) !== null) {
                    url = member.user.avatarURL("png", false, 64);
                    title = "L'avatar de " + member.user.username;
                    doEmbed(url, title, message);
                } else {
                    message.channel.send(`:x: | Cet utilisateur n'a pas d'avatar!`).then((msg) => msg.delete({ timeout: 1000 }));
                }
            } else {
                message.channel.send(`:x: | Impossible de trouver ce membre!`).then((msg) => msg.delete({ timeout: 1000 }));
            }
        } else {
            message.channel.send(`:x: | Commande non valide!`).then((msg) => msg.delete({ timeout: 1000 }));
        }
    }
}

function doEmbed(url, title, message) {
    let avatarEmbed = new Discord.MessageEmbed()
        .setColor("#ff9900")
        .setTitle(title)
        .setImage(url);

    message.channel.send(avatarEmbed);
}

module.exports = {
    name: "avatar",
    help: "Avatar",
    execute,
};