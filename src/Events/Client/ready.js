const { loadCommands } = require('../../Handlers/commandHandler');

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log("The Digital Miner Bot is ready.");
        client.user.setActivity(`with ${client.guilds.cache.size} guild(s)`);
        loadCommands(client)
    }
}