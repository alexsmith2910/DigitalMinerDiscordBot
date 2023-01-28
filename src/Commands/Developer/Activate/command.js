const { ChatInputCommandInteraction } = require("discord.js");

const { loadCommands } = require('../../../Handlers/commandHandler');

module.exports = {
    subCommand: 'activate.command',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        console.log('Activating Command...');
        const commandName = interaction.options.getString('name')
        console.log('Reloading Commands...')
        loadCommands(client, [commandName], []);
        interaction.reply({
            content: 'Activated Command.',
            ephemeral: true
        });
    }
}