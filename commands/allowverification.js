const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('allowverification')
        .setDescription('Allow my account.'),
    async execute(interaction) {
        var alreadyHad2 = interaction.member.roles.cache.has('1011973326454919202');

        let err1embed = new EmbedBuilder()
            .setTitle("Vous n'êtes pas autorisé(e) à utiliser cette commande.")
            .setDescription('You are not allowed to use this command.')
            .setColor('Red')

        if (alreadyHad2) {
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
                .setCustomId('allowVerif')
                .setLabel('OK')
                .setStyle(ButtonStyle.Success)
        );

        const embd = new EmbedBuilder()
        .setTitle('Pour valider la vérification, vous devez vous rendre dans le salon "rules" et accepter les règles du serveur, une fois ceci fait, vous pourez commencer à communiquer.')
        .setDescription('To validate the verification, you must go to the "rules" room and validate that you have read the rules of the server, once this is done, you can start communicating.')
        .setColor('Green')

        return interaction.reply({ embeds: [embd], components: [row] })
    }
}