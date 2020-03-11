const classes = {
    Command: require("./classes/Command")
}

const functions = {
    Universal: require("./functions/Universal")
}

const modules = {
    Discord: require("discord.js"),
    fs: require("fs")
}

module.exports = {
    ...classes,
    ...functions,
    ...modules,
    init: init()
}

function init() {
    functions.Universal.sendLog("info", "Modules imported");
    return new Date();
}