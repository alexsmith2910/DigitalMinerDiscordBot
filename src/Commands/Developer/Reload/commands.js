const { ChatInputCommandInteraction } = require("discord.js");

const { loadCommands } = require('../../../Handlers/commandHandler');

module.exports = {
    subCommand: 'reload.commands',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        console.log('Reloading Commands...');
        loadCommands(client);
        interaction.reply({
            content: 'Reloaded Commands.',
            ephemeral: true
        });
    }
}