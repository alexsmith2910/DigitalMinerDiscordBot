const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction } = require('discord.js');
const Transcripts = require('discord-html-transcripts');

module.exports = {
    active: true,
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Bulk delete messages.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false)
    .addNumberOption(options => options
        .setName('amount')
        .setDescription('Provide the amount of messages you intent to delete.')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    )
    .addUserOption(options => options
        .setName('target')
        .setDescription('Provide the target member to only delete messages from.')
    )
    .addStringOption(options => options
        .setName('reason')
        .setDescription('Provide a reason why you are clearing these messages.')
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const amount = interaction.options.getNumber('amount');
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason');

        const channelMessages = await interaction.channel.messages.fetch();
        const logChannel = interaction.guild.channels.cache.get('1068739635834003516');

        const responseEmbed = new EmbedBuilder().setColor('DarkNavy');
        const logEmbed = new EmbedBuilder().setColor('DarkAqua')
        .setAuthor({ name: 'Clear Command Used' });

        let logEmbedDescription = [
            `- Moderator: ${interaction.member}`,
            `- Channel: ${interaction.channel}`,
            `- Target: ${target || 'None'}`,
            `- Reason: ${reason || 'None'}`
        ];

        if (target) {
            let i = 0;
            let messagesToDelete = [];
            channelMessages.filter((message) => {
                if (message.author.id === target.id && amount > i) {
                    messagesToDelete.push(message);
                    i++;
                }
            });

            const transcript = await Transcripts.generateFromMessages(messagesToDelete, interaction.channel);

            interaction.channel.bulkDelete(amount, true).then((message) => {
                interaction.reply({
                    embeds: [responseEmbed.setDescription(`Cleared \`${messages.size}\` messages.`)],
                    ephemeral: true
                });

                logEmbedDescription.push(`Total Messages: ${messages.size}`);
                logChannel.send({
                    embeds: [logEmbed.setDescription(logEmbedDescription.join('\n'))],
                    files: [transcript]
                });
            });
        } else {
            const transcript = await Transcripts.createTranscript(interaction.channel, { limit: amount });

            interaction.channel.bulkDelete(amount, true).then((messages) => {
                interaction.reply({
                    embeds: [responseEmbed.setDescription(`Cleared \`${messages.size}\` messages.`)],
                    ephemeral: true
                });

                logEmbedDescription.push(`Total Messages: ${messages.size}`);
                logChannel.send({
                    embeds: [logEmbed.setDescription(logEmbedDescription.join('\n'))],
                    files: [transcript]
                });
            });
        }
    }
}