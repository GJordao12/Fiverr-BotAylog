const execute = async (bot, message, args) => {

    const amount = args[1];
    if(!amount){
        return message.channel.send(`:exclamation: | Veuillez saisir le nombre de messages que vous souhaitez supprimer (1-99)`).then((msg) => msg.delete({ timeout: 10000 }));
    }
    if (args.length == 2) {
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
            var qtdMensagens = parseFloat(args[1]) + 1;
            if (!Number.isNaN(qtdMensagens) && qtdMensagens <= 100 && qtdMensagens>=1) {
                await message.channel.bulkDelete(qtdMensagens).then(messages => {
                    message.channel.send(`\`${messages.size-1}\` Messages Effacés!  🧻 `).then(message => setTimeout(() => message.delete(), 10000));
                }).catch(() => {
                    message.channel.send(`:x: | Vous ne pouvez supprimer en bloc que les messages de moins de 14 jours. Insérez un nombre inférieur s'il vous plaît!`).then((msg) => msg.delete({ timeout: 10000 }));
                  });
            }else{
                message.channel.send(`:exclamation: | Pour éviter les bugs, choisissez un nombre entre \`1-99\` (comprenant).`).then((msg) => msg.delete({ timeout: 10000 }));
            }
        }else {
            message.channel.send(`:x: | Vous n'avez pas les autorisations pour cette commande!`).then((msg) => msg.delete({ timeout: 10000 }));
        }
    }else{
        message.channel.send(`:x: | Commande non valide!`).then((msg) => msg.delete({ timeout: 10000 }));
    }
}

module.exports = {
    name: "supprimer",
    help: "Avatar",
    execute,
  };