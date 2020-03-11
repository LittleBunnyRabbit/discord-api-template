const {
    Universal
} = require("../../imports/Imports");

module.exports = function(msg) {    
    if(msg.author.bot) return;
    return executeCommand(this, msg);
};

function executeCommand(client, msg) {
    const args = msg.content.slice(process.env.PREFIX.length).split(/ +/);
    const command = args.shift().toUpperCase();

    if(!client.commands) return Universal.sendLog("error", "Command collection doesn't exist!");
    if(!client.commands.has(command)) return;

    return client.commands.get(command).execute(msg, args);
}