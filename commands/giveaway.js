const ms = require('ms')

const execute = async (bot, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":x: | Vous n'avez pas l'autorisation de gérer les messages.").then((msg) => msg.delete({ timeout: 10000 }));
        
    const channel = message.mentions.channels.first();
    if(!channel) return message.channel.send(":exclamation: | Veuillez spécifier une chaîne").then((msg) => msg.delete({ timeout: 10000 }));

    const aux = args[2];
    if(!aux){
        return message.channel.send(":exclamation: | Veuillez entrer une durée valide").then((msg) => msg.delete({ timeout: 10000 }));
    }
    if(Number.isNaN(parseInt(args[2].substring(0, args[2].length - 1))) || parseInt(args[2].substring(0, args[2].length - 1)) < 0) return message.channel.send(":exclamation: | Veuillez entrer une durée valide").then((msg) => msg.delete({ timeout: 10000 }));
    var duration;
    switch (args[2].slice(-1)) {
        case 's':
            duration = ((parseInt(args[2].substring(0, args[2].length - 1)) * 1000));
            break;
        case 'm':
            duration = ((parseInt(args[2].substring(0, args[2].length - 1))) * 1000 * 60);
            break;
        case 'h':
            duration = ((parseInt(args[2].substring(0, args[2].length - 1))) * 1000 * 60 * 60);
            break;
        case 'j':
            duration = ((parseInt(args[2].substring(0, args[2].length - 1))) * 1000 * 60 * 60 * 24);
            break;
        default:
            return message.channel.send(":exclamation: | Veuillez spécifier une minuterie qui existe\n\`s\`-second\n\`m\`-minute\n\`h\`-heure\n\`j\`-journée").then((msg) => msg.delete({ timeout: 10000 }));
    }

    if(Number.isNaN(parseInt(args[3])) || parseInt(args[3]) <= 0) return message.channel.send(":exclamation: | Veuillez spécifier un nombre de gagnants").then((msg) => msg.delete({ timeout: 10000 }));
    const winners = parseInt(args[3]);

    const titulo = args.slice(4).join(" ");
    if(!titulo) return message.channel.send(":exclamation: | Veuillez spécifier un prix à gagner").then((msg) => msg.delete({ timeout: 10000 }));

    bot.giveaways.start(channel, {
        time : duration,
        prize : titulo,
        winnerCount: winners,
        hostedBy: bot.config.hostedBy ? message.author : null,
        messages: {
            giveaway: '@everyone\n\n🎉🎉 **GIVEAWAY** 🎉🎉',
            giveawayEnd: '@everyone\n\n🎉🎉 **GIVEAWAY TERMINÉ** 🎉🎉',
            timeRemaining: "Temps restant **{duration}**",
            inviteToParticipate: "Réagissez avec 🎉 pour participer au concours",
            winMessage: "Félicitations {winners}, vous avez gagné le giveaway!",
            embedFooter: "Giveaway Temps!",
            noWinner: "Impossible de déterminer un gagnant",
            hostedBy: 'Fait par {user}',
            winners: "Gagnants",
            endedAt: 'Fini à',
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: 'heures',
                days: 'journées',
                pluralS: false
            }
        },
       
    })
    message.channel.send(`:white_check_mark: | Giveaway commence dans ${channel}`).then((msg) => msg.delete({ timeout: 10000 }));
}

module.exports = {
    name: "giveaway",
    help: "Make a Giveaway",
    execute,
  };