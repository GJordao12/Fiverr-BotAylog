const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
bot.config = config;
const { GiveawaysManager } = require("discord-giveaways");

bot.login(config.token);

bot.giveaways = new GiveawaysManager(bot, {
  storage: "./giveaways.json",
  updateCountdownEvery: 1000,
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    reaction: "🎉",
  },
});

bot.on("ready", () => {
  console.log(`Im on`);
  bot.user.setPresence({
    activity: {
      name: "twitch",
      type: "STREAMING",
      url: "https://www.twitch.tv/aylogtv",
    },
    status: "online",
  });
});

bot.on("message", async (message) => {
  if (message.author.bot) return;
  if (
    message.channel.id != "856562563035037716" &&
    message.channel.id != "856562637239353384" &&
    message.channel.id != "856562509522403359" &&
    message.channel.id != "856562593232715826" &&
    message.channel.id != "796831984253009931"
  ) {
    if (
      (message.content.includes("https://") ||
        message.content.includes("http://")) &&
      message.author.id === message.guild.ownerID
    ) {
      // do nothing
    } else {
      split = message.content.split(" ");
      for (i = 0; i < split.length; i++) {
        if (
          (split[i].startsWith("https://") || split[i].startsWith("http://")) &&
          split[i] != "https://www.twitch.tv/aylogtv" &&
          split[i] != "https://twitch.tv/aylogtv" &&
          split[i] !=
            "https://www.youtube.com/channel/UCmY_J1aKDKdEo0jglUmEDsg" &&
          split[i] != "https://youtube.com/channel/UCmY_J1aKDKdEo0jglUmEDsg"
        ) {
          return message.delete();
        }
      }
    }
  }
  if (message.channel.type === "dm") return;
  if (
    message.content.startsWith(`<@!${bot.user.id}`) ||
    message.content.startsWith(`<@${bot.user.id}`)
  )
    return;
  if (!message.content.startsWith(config.prefixo)) return;

  var args = message.content.split(" ");
  var command = args[0].slice(1);
  command = command.toLowerCase();

  if (command === "youtube") {
    command = "yt";
  }

  try {
    let commandFile = require(`./commands/${command}.js`);
    delete require.cache[require.resolve(`./commands/${command}.js`)];
    return commandFile.execute(bot, message, args);
  } catch (err) {
    message.channel.send(`:x: | Commande non valide!`).then((msg) => msg.delete({ timeout: 10000 }));
  }
});
