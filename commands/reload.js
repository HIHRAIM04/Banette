module.exports = {
	name: 'reload',
	description: 'Перезагружает определенную команду',
	usage: '[название команды]',
	aliases: ['reset', 'перезагрузка'],
	args: true,
	IDs: ['430984819862929409'],
	execute(message, args) {
		if(message.author.id != "430984819862929409") return message.reply({content: `Ты не можешь перезагружать команды, ${message.author}!`})
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send({content: `Не существует команды с названием \`${command.name}\`, ${message.author}!`});
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send({content: `Команда \`${command.name}\` перезагружена`});
		} catch (error) {
			console.log(error);
			message.channel.send({content: `Произошла ошибка при перезагрузке команды \`${command.name}\`:\n\`${error.message}\``});
		}
	},
};