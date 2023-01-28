const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember]
});

const { loadEvents } = require("./Handlers/eventHandler");

client.config = require('./config.json');
client.events = new Collection();
client.commands = new Collection();
client.subCommands = new Collection();

const { connect, mongoose } = require('mongoose');
mongoose.set('strictQuery', true);
connect(client.config.databaseURL, {
}).then(console.log("Client Database Connected"));

loadEvents(client);

client.login(client.config.token);