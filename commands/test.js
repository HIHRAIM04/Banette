const Discord = require('discord.js')
const os = require('os')
module.exports = {
	name: 'test',
	description: 'Test.',
	execute(message, args) {
		let result = os.release() + os.hostname() + os.platform()
        let result1 = os.type()
        let result2 = os.cpus()
        console.log(os, result)
        console.log(result1)
        console.log(result2)
        const ytMess = new Discord.MessageEmbed()
            .setTitle('Тест')
            .setDescription(``)
            .setColor('ff0101')
            .setThumbnail(message.author.displayAvatarURL())
        //message.channel.send(ytMess)    
	},
};