const fs = require('fs');
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');

const prefix = process.env.BOT_PREFIX;
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

let guildsSize

client.once('ready', () => {
	console.log('Ready!');
	guildsSize = client.guilds.cache.array().length
	let status = {
		type: ['LISTENING', 'WATCHING'],
		text: ['hp!help', '']
	}
	const updateDelay = 15; // in seconds
	let currentIndex = 0;
	const updateStatus = status => {
		setInterval(() => {
			status.text[status.text.length - 1] = checkGuilds()
			if(!status.type[currentIndex]) {
				return
			}
			const activity = {
				text: status.text[currentIndex], 
				actype: status.type[currentIndex]
			}
			client.user.setActivity(activity.text, { type: activity.actype });
			// update currentIndex
			// if it's the last one, get back to 0
			currentIndex = currentIndex >= status.type.length - 1 
			? 0
			: currentIndex + 1;
		}, updateDelay * 1000);
	}
	var reqTimer = setTimeout(function wakeUp() {
		request("https://banette-bot.herokuapp.com/", function() {
		   console.log("WAKE UP DYNO");
		});
		return reqTimer = setTimeout(wakeUp, 1200000);
	 }, 1200000);
	try {
		updateStatus(status) && reqTimer
	} catch(err) {
		console.error(err)
	}
	function checkGuilds() {
		let word = "сервер"
		let servers = guildsSize + ""
		let s = servers.length - 1
		if(servers[s] > 1 && servers[s] < 5) {
			word += "а"
		} else if(servers[s] != 1) {
			word += "ов"
		}
		let string = `${servers[s]} ${word}`
		return string
	}
});

/*client.on('guildMemberAdd', member =>{
    const mlog = member.guild.channels.cache.get('754641680568942612');
	const embeded = new Discord.MessageEmbed()
    .setColor ('0x0099ff')
	.setTitle ('Добро пожаловать, ' + `${member}` + '!')
    .setDescription ('Приветствуем тебя на сервере Crazy Team. Пожалуйста, почитай каналы категории Инфо, и вот самые важные: <#716631651261743125> - правила сервера, <#716635295998672946> - роли на сервере, <#716642499145498674> - новости сервера')
	.setFooter ('С уважением, администрация сервера')
	.setThumbnail(member.user.avatarURL())
	.setTimestamp(member)
	let day = 1000 * 60 * 60 * 24
	let date1 = new Date(message.createdTimestamp)
	let date2 = new Date(argsUser.createdTimestamp)
	let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day))
	const nmemb = new Discord.MessageEmbed()
    .setColor ('0x0099ff')
	.setTitle ('Новый участник!')
    .addFields(
		{ name: 'Ник:', value: `${member}` },
		{ name: 'ID:', value: member.user.id },
		{ name: 'Дата создания аккаунта', value: `${strftime('%d.%m.%Y', new Date(member.user.createdTimestamp))}\n(${diff1} дн. назад)`}
	)
	.setFooter ('Это обычный человек...')
	.setThumbnail(member.user.avatarURL())

	const nbot = new Discord.MessageEmbed()
    .setColor ('0x0099ff')
	.setTitle ('Новый бот!')
    .addFields(
		{ name: 'Ник:', value: `${member}` },
		{ name: 'ID:', value: member.user.id },
		{ name: 'Дата создания аккаунта', value: `${strftime('%d.%m.%Y', new Date(member.user.createdTimestamp))}\n(${diff1} дн. назад)` }
	)
	.setFooter ('Это бот...')
	.setThumbnail(member.user.avatarURL())

	const channel = member.guild.channels.cache.get('716621673817833517');
	if(!channel) return;
	if (member.user.bot) return mlog.send(nbot);
	
	channel.send(embeded);
	mlog.send(nmemb)
});


client.on('guildMemberRemove', member =>{
	const mlog = member.guild.channels.cache.get('754641680568942612');
	const lmemb = new Discord.MessageEmbed()
    .setColor ('0x0099ff')
	.setTitle ('Участник покинул нас...')
    .addFields(
		{ name: 'Ник:', value: `${member}` },
		{ name: 'ID:', value: member.user.id }
	)
	.setFooter ('Это обычный человек...')
	.setThumbnail(member.user.avatarURL())

	const lbot = new Discord.MessageEmbed()
    .setColor ('0x0099ff')
	.setTitle ('Бот покинул нас...')
    .addFields(
		{ name: 'Ник:', value: `${member}` },
		{ name: 'ID:', value: member.user.id }
	)
	.setFooter ('Это бот...')
	.setThumbnail(member.user.avatarURL())
	
	if(member.user.bot) return mlog.send(lbot);
	mlog.send(lmemb);
});*/

client.on('guildCreate', guild => {
	let channels = guild.channels.cache.array().filter(c => c.type == 'news' && c.viewable && guild.member(client.user).hasPermission('SEND_MESSAGES'))
	let embed = new Discord.MessageEmbed()
		.setTitle('Спасибо, что добавили меня на сервер!')
		.setDescription('Команда H-P благодарна Вам, что вы добавили Banette на Ваш сервер. Чтобы узнать список команд, доступных Вам, в любом предназначенном для ботов канале введите `hp!help`')
		.setColor('00ff00')
		.setFooter('Хорошего дня!')
	if(!channels[0]) {
		channels = guild.channels.cache.array().filter(c => c.type == 'text' && c.viewable && guild.member(client.user).hasPermission('SEND_MESSAGES'))
		if(!channels[0]) {
			let owner = guild.members.cache.get(guild.ownerID)
			owner.send({embeds: [embed]})
		} else {
			channels[0].send({embeds: [embed]})
		}
	} else {
		channels[0].send({embeds: [embed]})
	}
	guildsSize++
})
client.on('guildDelete', guild => {
	guildsSize--
})

client.on('messageCreate', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const MOD = message.member;
	//const errlog = message.channel.guild.channels.cache.get('748807049563078746');

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply({content: 'Я не могу обработать эту команду в личных сообщениях'});
	}

	let per
	let IDs
	if(command.permissions) {
		let a = command.permissions;
		let b = message.member.permissions.toArray();
		for(let c in a) {
			if(!b.includes(a[c])) {
				per = false;
			} else per = true;
		};
	}
	if(command.IDs) {
		if(!command.IDs.includes(message.author.id)) {
			IDs = false;
		} else IDs = true;
	}
	if((per == false && IDs == false) || (per == undefined && IDs == false) || (per == false && IDs == undefined)) return message.reply({content: "У вас нет прав для использования данной команды"});

	if (command.args && !args.length) {
		let reply = `Вы не указали ни единого аргумента, ${message.author}!`;

		if (command.usage) {
            reply += `\nПравльное использование данной команды: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send({content: reply});
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
    }
    if(!command.notdelmess) message.delete().catch(err => console.log(err));

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply({content: `Пожалуйста, подождите ${timeLeft.toFixed(1)} секунд перед использованием команды \`${command.name}\``});
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		//errlog.send(erremb);
		message.reply({content: 'Произошла ошибка при обработке команды'});
    }
});

client.login(process.env.BOT_TOKEN);