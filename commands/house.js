module.exports = {
	name: 'house',
	description: 'Отправляет домик в чат',
    category: 'relax',
	execute(message, args) {
		message.channel.send({content: '(~~~)\n▅╰╱▔▔▔▔▔▔▔╲\n▕▕╱╱╱╱╱╱╱╱╱╲╲ \n▕▕╱╱╱╱╱╱╱╱┛▂╲╲ \n╱▂▂▂▂▂▂╱╱┏▕╋▏╲╲ \n▔▏▂┗┓▂▕▔┛▂┏▔▂▕▔ \n▕▕╋▏▕╋▏▏▕┏▏▕╋▏▏ \n▕┓▔┗┓▔┏▏▕┗▏ ┓▔┏'})    
	},
};