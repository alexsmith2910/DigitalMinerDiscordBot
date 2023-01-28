const { ChatInputCommandInteraction } = require("discord.js");

const { loadCommands } = require('../../../Handlers/commandHandler');
const deactivate = require("./deactivate");

module.exports = {
    subCommand: 'deactivate.command',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        console.log('Deactivating Command...');
        const commandName = interaction.options.getString('name')
        console.log('Reloading Commands...')
        loadCommands(client, [], [commandName]);
        interaction.reply({
            content: 'Deactivated Command.',
            ephemeral: true
        });
    }
}