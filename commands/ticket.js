const execute = async (bot, message, args) => {
  message.delete();

  const channel = message.guild.channels.cache.find(
    (ch) => ch.name === `${message.author.id}`
  );

  channelTicket = message.guild.channels.cache.find(
    (ch) => ch.name === "Tickets"
  );

  if (!channelTicket) {
     await message.guild.channels.create("Tickets", {
      type: "category",
      permissionsOverwrites: [
        {
          id: message.guild.id,
          deny: ["VIEW_CHANNEL"],
        },
      ],
    });
    channelTicket = message.guild.channels.cache.find(
      (ch) => ch.name === "Tickets"
    );
  }

  if (channel)
    return message.channel
      .send(
        `:x: | ${message.author} Votre billet actuel est déjà ouvert à : ${channel}!`
      )
      .then((msg) => msg.delete({ timeout: 10000 }));

  message.guild.channels
    .create(`${message.author.id}`, {
      type: "text",
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: ["VIEW_CHANNEL"],
        },
        {
          id: message.author.id,
          allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES"],
        },
      ],
      parent: await message.guild.channels.cache.find(
        (ch) => ch.id === channelTicket.id
      ),
    })
    .then(async (channel) => {
      message.channel
        .send(`✅ | ${message.author} Ticket créé avec succès: ${channel}`)
        .then((msg) => msg.delete({ timeout: 1000 }));
      channel.send(`👋 | Salut ${message.author}, c'est votre ticket! 
👋 | Si vous souhaitez fermer votre ticket, utilisez **+finirticket**.`);
    });
};

module.exports = {
  name: "ticket",
  help: "Create Ticket",
  execute,
};
