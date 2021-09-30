const execute = async(bot, message, args) => {
    if (args.length == 1) {
        message.channel.send("https://www.twitch.tv/aylogtv");
    } else {
        message.channel.send(`:x: | Commande non valide!`).then((msg) => msg.delete({ timeout: 1000 }));
    }
};

module.exports = {
    name: "twitch",
    help: "Twitch",
    execute,
};