
const execute = async (bot, message, args) => {
    const p = args[1];
    if(!p){
        return message.channel.send(`:exclamation: | Veuillez saisir la personne que vous souhaitez kick (@)!`).then((msg) => msg.delete({ timeout: 10000 }));
    }
    const why = args[2];
    if(!why){
        return message.channel.send(`:exclamation: | Veuillez saisir la raison pour laquelle vous souhaitez kick cette personne!`).then((msg) => msg.delete({ timeout: 10000 }));
    }
    var texto = "";
    for (i = 2; i < args.length; i++) {
        texto = texto + args[i] + " ";
    }
    if (args.length >= 3) {
        if (message.member.hasPermission('KICK_MEMBERS')) {
            const member = message.guild.member(message.mentions.users.first());
            if (member) {
                const owner = message.guild.owner;
                if (!(message.mentions.users.first() === bot.user) && member != owner) {
                    member.user.send(`Vous avez été kick de ` + message.guild.name + `.\n**Raison: **${texto}`).then(() => {
                        member.kick().then(() => {
                            message.channel.send(`:white_check_mark: | Démarrer avec succès ${member.user.tag}.`).then((msg) => msg.delete({ timeout: 10000 }));
                            }).catch(() => {
                                message.channel.send(`:x: | Vous ne pouvez pas kick cette personne!`).then((msg) => msg.delete({ timeout: 10000 }));
                              });
                    })
                } else {
                    message.channel.send(`:x: | Vous ne pouvez pas kick cette personne!`).then((msg) => msg.delete({ timeout: 10000 }));
                }
            } else {
                message.channel.send(`:x: | Impossible de kick ce membre!`).then((msg) => msg.delete({ timeout: 10000 }));
            }
        } else {
            message.channel.send(`:x: | Vous n'avez pas les autorisations pour cette commande!`).then((msg) => msg.delete({ timeout: 10000 }));
        }
    } else {
        message.channel.send(`:x: | Commande non valide!`).then((msg) => msg.delete({ timeout: 10000 }));
    }
}

module.exports = {
    name: "démarrer",
    help: "Kick Member",
    execute,
  };