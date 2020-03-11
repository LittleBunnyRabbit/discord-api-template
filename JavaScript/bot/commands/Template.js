const {
    Command
} = require("../../imports/Imports");

module.exports = new Command.Normal("TEMPLATE")
      .setName("TEMPLATE")
      .setInfo("This is a template command")
      .addUse("template", "sends 'hello'")
      .setCommand(template);

function template(msg) {
    return msg.channel.send("Hello!");
}