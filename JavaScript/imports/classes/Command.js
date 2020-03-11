const Universal = require("../functions/Universal");

/** 
 * Class representing a `Command`.
 */
class Command {
    /** 
     * Create a `Command` object.
    */
    constructor(name, info) {
        this.name = name;
        this.info = info;
        this.uses = [];
        this.subCommands = new Map();
        this.command; 
        this.execCounter = 0;
        this.type = "COMMAND";
        this.disabled = false;
    }
    
    /** 
     * Throw error if an element is not defined
     * in a setter
     * 
     * @throws an `Error`
     */
    throwSetError(element) { 
        throw new Error(`${element} is not defined!`); 
    }

    /** 
     * Set the name of the command.
     * 
     * @param {String} name
     * @returns {this}
     */
    setName(name) {
        if(!name) this.throwSetError("Name");
        this.name = name.toUpperCase();
        return this;
    }

    /** 
     * Set the info of the command.
     * 
     * @param {String} info
     * @returns {this}
     */
    setInfo(info) {
        if(!info) this.throwSetError("Info");
        this.info = info;
        return this;
    }

    /** 
     * Set the main executable command.
     * 
     * @param {Function} command
     * @returns {this}
     */
    setCommand(command) {
        if(!command) this.throwSetError("Command");
        this.command = command;
        return this;
    }

    /** 
     * Add a sub command.
     * 
     * @param {String} name
     * @param {Function} command
     * @returns {this}
     */
    addSubCommand(name, command) {
        if(!name) this.throwSetError("Sub command name");
        if(!command) this.throwSetError("Sub command");
        this.subCommands.set(name.toUpperCase(), command);
        return this;
    }
    
    /** 
     * Add usage.
     * 
     * @param {String} format How the command is used.
     * @param {String} description What happends when the command is used.
     * @returns {this}
     */
    addUse(format, description) {
        if(!format) this.throwSetError("Usage format");
        if(!description) this.throwSetError("Usage description");
        this.uses.push({ format, description });
        return this;
    }

    /** 
     * Disable this command.
     * 
     * @param {String} [reason]
     */
    disable(reason) {
        this.disabled = true;
        if(reason) this.reason = reason;
        return this;
    }
    
    /** 
     * Checks if the user has permission to use the command.
     * @returns {boolean} true
     */
    hasPermisson() {
        return true;
    }
    
    /** 
     * Executes either the main command or a sub command
     * based on the arguments.
     * 
     * @param {import('discord.js').Message} msg
     * @param {Array<String>} args
     * 
     * @returns {Promise<void>}
     */
    async execute(msg, args) {
        if(this.disabled) return msg.channel.send(`This command is disabled. ${this.reason ? `Reason: **${this.reason}**` : ""}`);
        if(!await this.hasPermisson(msg)) return await msg.channel.send("You can't execute this command!");
        Universal.sendLog(
            "command", 
            `${msg.guild === null ? "DM " : this.type} >> ${msg.author.tag} > ${this.name} ${args}`
        );
        await msg.channel.startTyping();
        
        if(this.subCommands.size > 0 && args && args.length > 0) {
            const newArgs = [ ...args ];
            const commandName = newArgs.shift().toUpperCase();
            if(this.subCommands.has(commandName)) {
                this.execCounter++;
                await this.subCommands.get(commandName)(msg, newArgs);
                return msg.channel.stopTyping();
            }
        }
        if(!this.command) return msg.channel.stopTyping();
        this.execCounter++;
        await this.command(msg, args);
        return msg.channel.stopTyping();
    }
}

/** 
 * Sub class of `Command`. Represents `Normal` commands.
 */
class Normal extends Command {
    constructor() {
        super();
        this.type = "NORMAL";
    }
}

/** 
 * A module that exports @class Normal, @class Admin and @class Master
 * 
 * @module Command
*/
module.exports = { Normal }