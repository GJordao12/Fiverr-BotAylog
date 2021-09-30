const Discord = require("discord.js");

const execute = async (bot, message, args) => {
  if (args.length == 1) {
    let helpMessage = new Discord.MessageEmbed()
      .setColor("#9B9B9B")
      .setTitle("Informations sur le Bot: ")
      .setDescription(
        "Ce bot a été créé dans le but d'aider les supérieurs du serveur." + 
        "\n\n **Commandes:** \n\n " + 
        "👉 `+supprimer (quantité de messages 1-99):` supprime le nombre de messages insérés du canal texte correspondant; \n " + 
        "👉 `+avatar`: montre ton avatar; \n "+
        "👉 `+avatar @personne`: montrer l'avatar de la personne que vous avez identifiée; \n " + 
        "👉 `+yt ou +youtube`: montrer la chaîne youtube \n " +
        "👉 `+twitch`:  montrer la chaîne twitch \n" +
        "👉 `+ban @personne raison`: bannir une personne du serveur pour toujours \n" + 
        "👉 `+bandoux @personne raison`: kick une personne du serveur et supprimez tous vos messages\n" +
        "👉 `+kick @personne raison`: kick une personne du serveur \n" +
        "👉 `+ticket`: ouvrir un ticket \n" +
        "👉 `+finirticket`: fermez votre ticket \n" +
        "👉 `+giveaway #channel temps(10s,10m,10h,10j) gagnants(1,2,..) prix(1€,PS5)`: créez un giveaway dans la chaîne que vous voulez avec le temps que vous voulez avec le nombre de gagnants que vous voulez et le prix du giveaway \n" +
        "👉 `+finirgiveaway messageID`: fermez le giveaway avec le message d'identification \n" +
        "👉 `+relancer messageID`: tire au sort de nouveaux gagnants avec le message d'identification \n"
      );

    message.channel.send(helpMessage);
  } else {
    message.channel.send(`:x: | Commande non valide!`);
  }
};

module.exports = {
  name: "aider",
  help: "Help",
  execute,
};
