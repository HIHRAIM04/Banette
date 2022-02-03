const Discord = require('discord.js');
const fs = require('fs')
module.exports = {
	name: 'ban',
	description: 'Банит участников',
	usage: '@пользователь [причина]',
	category: 'moderation',
	args: true,
	permissions: ['BAN_MEMBERS'],
	execute(message, args) {
		//var blackuser = JSON.parse(fs.readFileSync("blackmap/users.json", "utf8"));

		let bUser = message.mentions.members?.first() || message.guild.members.cache.get(args[0])

        if(!bUser) return 

		if(bUser.id === message.author.id) return message.channel.send({content: "Вы не можете забанить самого себя!"}); 

		if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply({content: "У меня нет прав!"})

		args = args.splice(1).join(' ')

		if (!bUser) return message.reply({content: "Вы не указали пользователя!"}) 

		if (!args) return message.reply({content: "Вы не указали причину!"})

		bUser.ban({reason: args})

		const ban_embed = new Discord.MessageEmbed()
     	.setColor('#db0f0f')
     	.addFields(
         	{ name: 'Пользователь', value: `<@${message.author.id}>` },
         	{ name: 'Забанил', value: `<@${bUser.id}>` },
         	{ name: 'По причине', value: args }
		);
		/*blackuser[blackuser.length] = {
			adminID: bUser.user.id,
			blackUserID: bUser.user.id,
			reason: args
		}
		fs.writeFile("blackmap/users.json", JSON.stringify(blackuser), (err) => { // Все данные сохраняются в .json файле
            if (err) console.log(err)
        });*/
		message.channel.send({embeds: [ban_embed]})
	},
};