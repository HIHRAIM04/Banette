const Discord = require('discord.js')
module.exports = {
	name: 'roll',
	description: 'Отправляет случайное число в чат',
    category: 'relax',
	execute(message, args) {
		let roll = Math.round(Math.random() * 99 + 1)
        const ansMess = new Discord.MessageEmbed()
        .setTitle('Случайное число')    
        .setDescription(roll.toString())
            .setColor('00ff00')
        message.reply({embeds: [ansMess]})
	},
};