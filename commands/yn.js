const Discord = require('discord.js')
module.exports = {
	name: 'yn',
	description: 'Отвечает на вопросы',
    args: true,
    notdelmess: true,
    category: 'relax',
	execute(message, args) {
		let ans1 = Math.round(Math.random())
        let ans2
        if(ans1 == 0) {
            ans2 = "Да"
        } else {
            ans2 = "Нет"
        }
        const ansMess = new Discord.MessageEmbed()
            .setDescription(ans2)
            .setColor('00ff00')
        message.reply({embeds: [ansMess]})
	},
};