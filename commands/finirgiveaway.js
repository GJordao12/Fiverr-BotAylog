const execute = async (bot, message, args) => {

  if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":x: | Vous n'avez pas l'autorisation de gérer les messages.").then((msg) => msg.delete({ timeout: 10000 }));

    if(!args[1]){
        return message.channel.send(":exclamation: | Vous devez spécifier un ID de message valide!").then((msg) => msg.delete({ timeout: 10000 }));
    }

    let giveaway = 
    bot.giveaways.giveaways.find((g) => g.prize === args.join(' ') && g.guildID === message.guild.id) ||
    bot.giveaways.giveaways.find((g) => g.messageID === args[1] && g.guildID === message.guild.id);

    if(!giveaway){
        return message.channel.send(':x: | Impossible de trouver un giveaway pour `'+ args[1] +'`.').then((msg) => msg.delete({ timeout: 10000 }));
    }

  bot.giveaways
    .edit(giveaway.messageID, {
      setEndTimestamp: Date.now(),
    })
    .then(() => {
      message.channel.send(
        ":white_check_mark: | Giveaway se terminera dans moins de " +
          bot.giveawaysManager.options.updateCountdownEvery / 1000 +
          " seconds..."
      ).then((msg) => msg.delete({ timeout: 10000 }));
    })
    .catch((e) => {
      if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
        message.channel.send(":exclamation: | Giveaway est déjà terminé!").then((msg) => msg.delete({ timeout: 10000 }));
      } else {
        console.error(e);
        message.channel.send(":x: | Une erreur s'est produite...").then((msg) => msg.delete({ timeout: 10000 }));
      }
    });
};

module.exports = {
  name: "finirGiveaway",
  help: "End Giveaway",
  execute,
};
