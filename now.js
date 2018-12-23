const Discord = require('discord.js')
const client = new Discord.Client()
client.on('ready', () => {
    // Set bot status to: "Playing with JavaScript"
    client.user.setActivity("poker or something")
})
client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (receivedMessage.content.startsWith("=")) {
        processCommand(receivedMessage)
    }
	
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading <
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "roll") {
        rollCommand(arguments, receivedMessage)
    } else if (primaryCommand == "emoji") {
        receivedMessage.guild.emojis.forEach(customEmoji => {
        console.log(`Reacting with custom emoji: ${customEmoji.name} (${customEmoji.id})`)
        receivedMessage.react(customEmoji)
    })
	}else {
		receivedMessage.channel.send("I don't understand the command. Try `=help` or `=roll` or `=emoji`")
    }
}

function helpCommand(arguments, receivedMessage) {
	receivedMessage.channel.send("`=roll` displays a random dice face, find out what `=emoji` does...")
}


function rollCommand(arguments, receivedMessage) {
    //choose random between 0-5
	//@RandomNumber, output related symbol
	switch (Math.floor(Math.random() * 5)) {
		case 0:
			receivedMessage.channel.send("⚀ - 1");
			break;
		case 1:
			receivedMessage.channel.send("⚁ - 2");
			break;
		case 2:
			receivedMessage.channel.send("⚂ - 3");
			break;
		case 3:
			receivedMessage.channel.send("⚃ - 4");
			break;
		case 4:
			receivedMessage.channel.send("⚄ - 5");
			break;
		case 5:
			receivedMessage.channel.send("⚅ - 6");
	}

}

client.login("NTI2MTEzNjE1Mjc5ODE2NzI1.DwBRXA.Hhbq21xANdIVcLyFLppNfy0Kepg") // Replace XXXXX with your bot token
