const execute = async(bot, message, args) => {
    if (args.length == 1) {
        message.channel.send("https://www.youtube.com/channel/UCmY_J1aKDKdEo0jglUmEDsg");
    } else {
        message.channel.send(`:x: | Commande non valide!`).then((msg) => msg.delete({ timeout: 1000 }));
    }
};

module.exports = {
    name: "yt",
    help: "Youtube",
    execute,
};