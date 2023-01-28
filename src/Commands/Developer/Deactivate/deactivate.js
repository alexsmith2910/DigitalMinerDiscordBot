const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    developer: true,
    active: true,
    data: new SlashCommandBuilder()
    .setName('deactivate')
    .setDescription('Deactivate your commands/events.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options
    .setName('command')
    .setDescription('Deactivate your command.')
    .addStringOption(option => option
        .setName("name")
        .setDescription('Provide the name of the command to deactivate.')
        .setRequired(true)))
    // .addSubcommand((options) => options
    // .setName('event')
    // .setDescription('Deactivate your event.'))
}