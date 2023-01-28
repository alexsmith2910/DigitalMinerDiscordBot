const { ChatInputCommandInteraction } = require("discord.js");

const { loadEvents } = require('../../../Handlers/eventHandler');

module.exports = {
    subCommand: 'reload.events',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        console.log('Reloading Events...');
        for (const [key, value] of client.events)
        client.removeListener(`${key}`, value, true);
        loadEvents(client);
        interaction.reply({
            content: 'Reloaded Events.',
            ephemeral: true
        });
    }
}