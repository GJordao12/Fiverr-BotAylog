const execute = async (bot, message, args) => {
  message.delete();

  if (message.channel.name !== `${message.author.id}`)
    return message.channel
      .send(
        `:x: | ${message.author} Vous ne pouvez utiliser cette commande que pour fermer votre ticket!`
      )
      .then((msg) => msg.delete({ timeout: 10000 }));

  message.channel.delete();
};

module.exports = {
  name: "finirTicket",
  help: "Close Ticket",
  execute,
};
