const execute = async (bot, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":x: | Vous n'avez pas l'autorisation de gérer les messages.").then((msg) => msg.delete({ timeout: 10000 }));

    if(!args[1]){
        return message.channel.send(":exclamation: | Vous devez spécifier un ID de message valide!").then((msg) => msg.delete({ timeout: 10000 }));
    }

    let giveaway = 
    bot.giveaways.giveaways.find((g) => g.prize === args.join(' ') && g.guildID === message.guild.id) ||
    bot.giveaways.giveaways.find((g) => g.messageID === args[1] && g.guildID === message.guild.id);

    if(!giveaway){
        return message.channel.send(':x: | Impossible de trouver un giveaway pour `'+ args.join(' ') +'`.').then((msg) => msg.delete({ timeout: 10000 }));
    }

    bot.giveaways.reroll(giveaway.messageID)
    .then(() => {
        message.channel.send(':white_check_mark: | Giveaway relancé!').then((msg) => msg.delete({ timeout: 10000 }));
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway avec message ID ${giveaway.messageID} est déjà terminé.`)){
            message.channel.send(':x: | Giveaway n\'est pas terminé!').then((msg) => msg.delete({ timeout: 10000 }));
        } else {
            console.error(e);
            message.channel.send(':x: | Une erreur s\'est produite...').then((msg) => msg.delete({ timeout: 10000 }));
        }
    });
}

module.exports = {
    name: "relancer",
    help: "Choose new giveaway winner",
    execute,
  };