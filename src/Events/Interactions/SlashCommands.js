const { ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if(!command)
        return interaction.reply({
            content: 'This command is outdated or currently not in use.',
            ephemeral: true
        });

        if (command.developer && interaction.user.id !== "377174371766370305")
        return interaction.reply({
            content: 'This command is only available to the developer.',
            ephemeral: true
        });

        const subCommand = interaction.options.getSubcommand(false);
        if (subCommand) {
            const subCommandFile = client.subCommands.get(`${interaction.commandName}.${subCommand}`);
            if (!subCommandFile) return interaction.reply({
                content: 'This sub command is outdated.',
                ephemeral: true
            });
            subCommandFile.execute(interaction, client);
        } else command.execute(interaction, client);
    }
}