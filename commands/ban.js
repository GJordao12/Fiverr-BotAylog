
const execute = async (bot, message, args) => {

    const p = args[1];
    if(!p){
        return message.channel.send(`:exclamation: | Veuillez saisir la personne que vous souhaitez bannir (@)!`).then((msg) => msg.delete({ timeout: 10000 }));
    }
    const why = args[2];
    if(!why){
        return message.channel.send(`:exclamation: | Veuillez saisir la raison pour laquelle vous souhaitez bannir cette personne!`).then((msg) => msg.delete({ timeout: 10000 }));
    }
    var texto = "";
    for (i = 2; i < args.length; i++) {
        texto = texto + args[i] + " ";
    }
    if (args.length >= 3) {
        if (message.member.hasPermission('BAN_MEMBERS')) {
            const member = message.guild.member(message.mentions.users.first());
            if (member) {
                const owner = message.guild.owner;
                if (!(message.mentions.users.first() === bot.user) && member != owner) {
                    member.user.send(`Vous avez été banni de ` + message.guild.name + `.\n**Raison: **${texto}`).then(() => {
                        message.guild.members.ban(member, { days: 7, reason: texto })
                            .then(() => {
                                message.channel.send(`:white_check_mark: | Banni avec succès ${member.user.tag}.`).then((msg) => msg.delete({ timeout: 10000 }));
                            }).catch(() => {
                                message.channel.send(`:x: | Vous ne pouvez pas bannir cette personne!`).then((msg) => msg.delete({ timeout: 10000 }));
                              });
                    })
                } else {
                    message.channel.send(`:x: | Vous ne pouvez pas bannir cette personne!`).then((msg) => msg.delete({ timeout: 10000 }));
                }
            } else {
                message.channel.send(`:x: | Impossible de bannir ce membre!`).then((msg) => msg.delete({ timeout: 10000 }));
            }
        } else {
            message.channel.send(`:x: | Vous n'avez pas les autorisations pour cette commande!`).then((msg) => msg.delete({ timeout: 10000 }));
        }
    } else {
        message.channel.send(`:x: | Commande non valide 1!`).then((msg) => msg.delete({ timeout: 10000 }));
    }
}

module.exports = {
    name: "ban",
    help: "Ban Member",
    execute,
  };