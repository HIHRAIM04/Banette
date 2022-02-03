const Discord = require('discord.js')
const os = require('os')
module.exports = {
	name: 'botinfo',
	description: 'Информация о боте',
    category: 'info',
	execute(message, args) {
        let embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Информация о боте`)
            .setDescription(`Вычисляю пинг...`)
        
        message.channel.send({embeds: [embed]}).then(msg => {
            let pingEmbed = new Discord.MessageEmbed()
                .setTitle(`Информация о боте`)
                .addField(`Пинг Discord API`, message.client.ws.ping + ' ms', true)
                .addField('Пинг Discord бота', Math.floor(msg.createdAt - message.createdAt) + ' ms')
                .addField('Название утсройства', os.hostname(), true)
                .addField('Система', os.type() + ' v' + os.release())
                .addField('Язык бота', 'JavaScript')
                .addField('Команды', `\`${message.client.commands.array().length}\``)
                .addField('Разработчики', 'HIHRAIM & KiRiK')
                .addField('Статус бота', message.client.user.presence.status)
                .setColor('ff0101')
                .setThumbnail(message.author.displayAvatarURL())
            
            msg.edit({embeds: [pingEmbed]});
        }) 
	},
};