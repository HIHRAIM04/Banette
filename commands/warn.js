const fs = require('fs'); // Подключаем родной модуль файловой системы node.js
const Discord = require('discord.js');
module.exports = {
	name: 'warn',
    aliases: ['предупреждение', 'варн'],
	description: 'Предупреждают пользователей',
	execute(message, args) {
        var warns = JSON.parse(fs.readFileSync("./data.json", "utf8")); // Объявляем переменную warns, с помощью которой бот сможет прочитать файл data.json
        if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply({content: "У вас нет прав для использования данной команды"}); // Если пользователь попытается предупредить участника сервера без привилегии KICK_MEMBERS, ему будет в этом отказано.

        if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply({content: "У меня нет прав!"}) // Если у бота нету привилегии KICK_MEMBERS, он отправит соответствующее сообщение

        var wUser = message.guild.members.resolve(message.mentions.users.first()) || message.guild.members.cache.get(args[0]) // Восприятие упоминания и аргумента

        if(wUser.user.id === message.author.id) return message.reply({content: "Вы не можете выдать предупреждение самому себе!"}); // Если пользователь попытается предупредить самого себя, ему будет в этом отказано.

        if (!wUser) return message.reply({content: "Вы не указали пользователя"}) // Если пользователь не найден/не указан - в предупреждении пользователю будет отказано
        if (!warns.guilds[message.guild.id]) warns.guilds[message.guild.id] = {
            users: {}
        }

        if (!warns.guilds[message.guild.id].users[wUser.user.id]) warns.guilds[message.guild.id].users[wUser.user.id] = { // Если ID пользователя не найден, количество предупреждений устанавливается на 0
            warns: 0
        };

        warns.guilds[message.guild.id].users[wUser.user.id].warns++; // Если все проверки прошли успешно, к текущему количеству предупреждений пользователя прибавляется +1

        fs.writeFile("./data.json", JSON.stringify(warns), (err) => { // Все данные сохраняются в .json файле
            if (err) console.log(err)
        });
        if (warns.guilds[message.guild.id].users[wUser.user.id].warns >= 3) { // Если обнаружено 3+ предупреждений, то... 

            wUser.kick({reason: "3/3 предупреждений"}) // Кикнуть участника сервера по причине "3/3 предупреждений"
            warns.guilds[message.guild.id].users[wUser.user.id] = {
                warns: 0
            }

            fs.writeFile("./data.json", JSON.stringify(warns), (err) => { // Всё сохраняется в .json файл
            if (err) console.log(err)
            });

            var warn_embed1 = new Discord.MessageEmbed() // Embed, отправляющийся при третьем предупреждении
            .setColor('#db0f0f')
            .addFields(
                { name: 'Администратор', value: `<@${message.author.id}>` },
                { name: 'Выдал предупреждение', value: `<@${wUser.id}>` },
                { name: 'Количество предупреждений', value: '3/3 **[Кик]**' }
            );

            message.channel.send({embeds: [warn_embed1]})

        } else { // Иначе...

            var warn_embed2 = new Discord.MessageEmbed() // Embed, отправляющийся при 1 и 2 предупреждении
            .setColor('#db0f0f')
            .addFields(
                { name: 'Администратор', value: `<@${message.author.id}>` },
                { name: 'Выдал предупреждение', value: `<@${wUser.id}>` },
                { name: 'Количество предупреждений', value: `${warns.guilds[message.guild.id].users[wUser.user.id].warns}/3` }
            );

            message.channel.send({embeds: [warn_embed2]})

            if (warns.guilds[message.guild.id].users[wUser.user.id].warns >= 3) warns.guilds[message.guild.id].users[wUser.user.id] = { // Если обнаружено 3+ предупреждений, их количество устанавливается на 0
            warns: 0
            };

            fs.writeFile("./data.json", JSON.stringify(warns), (err) => { // Всё сохраняется в .json файле
                if (err) console.log(err)
            });
        }
    }
};