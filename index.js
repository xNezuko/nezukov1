const dotenv = require('dotenv');
if(process.env.NODE_ENV !== 'production')
     dotenv.config();


const {BOT_TOKEN} = process.env;    


const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

bot.on("guildMemberAdd", async (member) => { // Mensagem de boas vindas

    let guild = bot.guilds.cache.get("724586570648387655"); //ID DO servidor
    let channel = bot.channel.cache.get("724589705915662397"); //ID DO canal
    let emoji = member.guild.emojis.cache.find(emoji => emoji.name === 'verify');
    let emoji2 = member.guild.emojis.cache.find(emoji => emoji.name === 'takagi');
    if(guild != member.guild) {
        return console.log('Rala tiow, tu não tá no meu server seu guei');
     } else {
       
        let embed = new Discord.MessageEmbed()
        .setColor('#00FFFF')
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle(`${emoji} Boas-vindas ${emoji}`) 
        .setImage('https://tenor.com/view/zero-two-darling-zero-two-anime-happy-gif-17596327')
        .setDescription(`${member.user}, bem-vindo ao servidor ${guild.name}! Atualmente estamos com 
        ${member.guild.memberCount} membros ${emoji2}.`)
        .addField('Canais', 'Leia as regras para evitar futuros tumultos dentro do servidor rp/discord. Regras discord: <#724589709245808744')
        .addField('RegrasSV', 'Regras discord: <#724589710156103711')
        .addField('Atts', 'Para acompanhar atualizações futuras do servidor, vá em: <#724589707706761219')
        .setThumbnail(member.user.displayAvatarURL({ dynamic:true, format: "png", size: 1024}))
        .setFooter('ID do usuário: ' + member.user.id)
        .setTimestamp();


        await channel.send(embed) // FINAL DAS MENSAGENS DE BOAS VINDAS
    }

})

fs.readdir("./comandos/", (err, files) => {
    if (err) console.error(err);

    let arquivojs = files.filter(f => f.split(".").pop() === "js");
    arquivojs.forEach((f, i) => {
        let props = require(`./comandos/${f}`);
        console.log(`Comando ${f} iniciou com sucesso`)
        bot.commands.set(props.help.name, props);
    });
});

bot.on('ready', () => {
    console.log(`Bot foi iniciado com sucesso`);
    bot.user.setActivity("meu criador dlç ! F0rest.exe#3852", {type: "WATCHING"});
});

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(config.prefix)) return;
    
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    let arquivocmd = bot.commands.get(command.slice(prefix.length));
    if (arquivocmd) arquivocmd.run(bot, message, args);
});


const dotenv = require('dotenv');
if(process.env.NODE_ENV !== 'production')
     dotenv.config();


const {BOT_TOKEN} = process.env;    


const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./comandos/", (err, files) => {
    if (err) console.error(err);

    let arquivojs = files.filter(f => f.split(".").pop() === "js");
    arquivojs.forEach((f, i) => {
        let props = require(`./comandos/${f}`);
        console.log(`Comando ${f} iniciou com sucesso`)
        bot.commands.set(props.help.name, props);
    });
});

bot.on('ready', () => {
    console.log(`Bot foi iniciado com sucesso`);
    bot.user.setActivity("meu criador dlç ! F0rest.exe#3852", {type: "WATCHING"});
});

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(config.prefix)) return;
    
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    let arquivocmd = bot.commands.get(command.slice(prefix.length));
    if (arquivocmd) arquivocmd.run(bot, message, args);
});

bot.login(config.token);