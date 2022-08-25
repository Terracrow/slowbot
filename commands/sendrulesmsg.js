const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendrulesmsg')
        .setDescription('Only for Staff.'),
    async execute(interaction) {
        var alreadyHad2 = interaction.member.roles.cache.has('1011969467120627733');

        let err1embed = new EmbedBuilder()
            .setTitle("Vous n'êtes pas autorisé(e) à utiliser cette commande.")
            .setDescription('You are not allowed to use this command.')
            .setColor('Red')

        if (!alreadyHad2) {
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('deleteMsg')
                    .setLabel('OK')
                    .setStyle(ButtonStyle.Danger)
            );

            return interaction.reply({ embeds: [err1embed], components: [row] })
        }

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('acceptRules')
                .setLabel('OK')
                .setStyle(ButtonStyle.Success)
        );

        const embd = new EmbedBuilder()
        .setTitle('En cliquant sur le bouton ci-dessous, vous acceptez le réglement du serveur et vous serez désormais autorisé à envoyer du contenu sur le serveur.')
        .setDescription('By clicking the button below, you accept the rules of the server and you will now be authorized to send content on the server.')
        .setColor('Green')

        return interaction.reply({ embeds: [embd], components: [row] })
    }
}