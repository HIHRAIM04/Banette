const Discord = require('discord.js')
module.exports = {
	name: 'yt',
	description: 'Отправляет ссылку на запрос',
    usage: '[ключевые слова]',
    args: true,
    category: 'relax',
	execute(message, args) {
		args = args.join('+')
        const ytMess = new Discord.MessageEmbed()
            .setTitle('Запрос на видеохостинг YouTube')
            .setDescription(`Вот [ссылка](https://youtube.com/results?search_query=${args}) на ваш запрос`)
            .setColor('ff0101')
            .setThumbnail(message.author.displayAvatarURL())
        message.channel.send({embeds: [ytMess]})    
	},
};