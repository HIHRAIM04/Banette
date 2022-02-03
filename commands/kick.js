const Discord = require('discord.js');
module.exports = {
	name: 'kick',
	aliases: ['кик', 'выгнать'],
	usage: '@пользователь [причина]',
	description: 'Выгоняет участников',
	args: true,
	execute(message, args) {
		if (!message.member.permissions.has("KICK_MEMBERS") || message.author.id != "430984819862929409") return message.reply({content: "У вас нет прав для использования данной команды"});
		if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply({content: "У меня нет прав!"})

		const kUser = message.mentions.members?.first() || message.guild.members.cache.get(args[0])
		if(kUser.user.id === message.author.id) return message.channel.send({content: "Вы не можете кикнуть самого себя!"}); 
		if(kUser.user.id === '430984819862929409') return message.channel.send({content: "Вы не можете кикнуть Кирика!"}); //хых

		const reason = args.splice(1).join(' ')
        if(!reason[0]) return message.reply({content: "Вы не указали причину!"})

		if (!kUser) return message.reply("Вы не указали пользователя!")
		if (!args) return message.reply("Вы не указали причину!")

		kUser.kick(reason)

		var kick_embed = new Discord.MessageEmbed()
     		.setColor('#db0f0f')
     		.addFields(
         		{ name: 'Администратор', value: `<@${message.author.id}>` },
         		{ name: 'Кикнул', value: `<@${kUser.id}>` },
         		{ name: 'По причине', value: reason }
     		);

		message.channel.send({embeds: [kick_embed]})
	 },
};