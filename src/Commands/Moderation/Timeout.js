const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const Database = require('../../Schemas/Infractions');
const ms = require('ms');

module.exports = {
    active: true,
    data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Restrict a member\'s ability to communicate.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addUserOption(options => options
        .setName('target')
        .setDescription('Select the target member.')
        .setRequired(true)
    )
    .addStringOption(options => options
        .setName('duration')
        .setDescription('Provide a duration for this timeout (1m,1h,1d)')
        .setRequired(true)
    )
    .addStringOption(options => options
        .setName('reason')
        .setDescription('Provide a reason for this timeout.')
        .setMaxLength(512)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { options, guild, member } = interaction;

        const target = options.getMember('target');
        const duration = options.getString('duration');
        const reason = options.getString('reason') || 'None Specified.';
    
        const errorsArray = [];

        const errorsEmbed = new EmbedBuilder()
        .setAuthor({ name: 'Could not timeout member' })
        .setColor("Red");

        if (!target) return interaction.reply({
            embeds: [errorsEmbed.setDescription("Member has most likely left the guild.")],
            ephemeral: true
        });

        if (!ms(duration) || ms(duration) > ms('28d'))
        errorsArray.push('Time provided is invalid or over the 28d limit.');

        if (!target.manageable || !target.moderatable)
        errorsArray.push('Selecred target is not moderatable by this bot.');

        if (member.roles.highest.position < target.roles.highest.position)
        errorsArray.push('Selected member has a higher rolem position than you.')

        target.timeout(ms(duration), reason).catch((err) => {
            interaction.reply({
                embeds: [errorsEmbed.setDescription('Could not timeout user to to an uncommon error.')],
                ephemeral: true
            });
            return console.log('Error occured in Timeout.js', err);
        });

        const newInfractionObject = {
            IssuerID: member.id,
            IssuerTag: member.user.tag,
            Reason: reason,
            Date: Date.now() 
        };

        let userData = await Database.findOne({ Guild: guild.id, User: target.id });
        if(!userData) userData = await Database.create({ Guild: guild.id, User: target.id, Infractions: [newInfractionObject] });
        else userData.Infractions.push(newInfractionObject) && await userData.save();

        const successEmbed = new EmbedBuilder()
        .setAuthor({ name: 'Timeout issues', iconURL: guild.iconURL() })
        .setColor("Gold")
        .setDescription([
            `${target} was issues a timeout for **${ms(ms(duration), {long: true})}** by ${member}`,
            `bringing their infractions total to **${userData.Infractions.length}** points.`,
            `\nReason: ${reason}`
        ].join('\n'));

        return interaction.reply({ embeds: [successEmbed] });
    }
};