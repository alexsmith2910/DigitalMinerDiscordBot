const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    developer: true,
    active: true,
    data: new SlashCommandBuilder()
    .setName('activate')
    .setDescription('Activate your commands/events.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(options => options
        .setName('command')
        .setDescription('Activate your command.')
        .addStringOption(option => option
            .setName("name")
            .setDescription('Provide the name of the command to activate.')
            .setRequired(true)))
    // .addSubcommand((options) => options
    // .setName('event')
    // .setDescription('Activate your event.'))
}