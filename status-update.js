const Discord = require('discord.js')

module.exports = (client) => {
    const status = {
		type: ['LISTENING', 'WATCHING'],
		text: ['hp!help', `${checkGuilds()}`]
	}
    const updateDelay = 15; // in seconds
    let currentIndex = 0;
    const updateStatus = status => {
        setInterval(() => {
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
    try {
        updateStatus(status)
    } catch(err) {
        console.error(err)
    }
    function checkGuilds() {
        let word = "сервер"
        let servers = client.guilds.cache.array().length + ""
        let s = servers.length - 1
        if(servers[s] > 1 && servers[s] < 5) {
            word += "а"
        } else if(servers[s] != 1) {
            word += "ов"
        }
        let string = `${servers[s]} ${word}`
        return string
    }
    client.on('guildCreate', guild => {
        client.guilds.cache.array().length++
    })
    client.on('guildDelete', guild => {
        client.guilds.cache.array().length--
    })
}