const Discord = require("discord.js");

module.exports = {
	name: 'avatar',
	description: 'Отправляет ваш аватар или аватар упомянутых пользователей',
	usage: 'ничего / @пользователь (до бесконечности)',
	aliases: ['icon', 'pfp'],
	category: 'relax',
	execute(message) {
		if (!message.mentions.users.size) {
			if(message.member.nickname) {
                nick = message.member.nickname
            } else {
                nick = message.author.username
            }
            let mavMess = new Discord.MessageEmbed()
				.setTitle(`Аватар ${nick}`)
				.setImage(message.author.displayAvatarURL({ dynamic: true }))
				.setColor(message.member.displayHexColor)
			return message.channel.send({embeds: [mavMess]});
		}

		const avatarList = message.mentions.users.map(user => {
            let nick
			if(user.nickname) {
				nick = message.guild.members.resolve(user).nickname
			} else {
				nick = user.username
			}
			let avMess = new Discord.MessageEmbed()
				.setTitle(`Аватар ${nick}`)
				.setImage(user.displayAvatarURL({ dynamic: true }))
				.setColor(message.guild.members.resolve(user).displayHexColor)
			return avMess
		});

        message.channel.send({embeds: avatarList})
 	},
};