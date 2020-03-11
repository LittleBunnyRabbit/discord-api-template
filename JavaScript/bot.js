const {
    Discord,
    Universal,
    fs
} = require("./imports/Imports");

require("dotenv").config(); 

const client = createClient();

async function createClient() {
    const client = new Discord.Client();

    const onMessage = require("./bot/events/onMessage");
    const onReady = require("./bot/events/onReady");

    client.on("message", onMessage);
    client.on("ready", onReady);

    client.on("disconnect", (event) => Universal.sendLog("warn", `Bot disconnected:\n${event}`));
    client.on("error", (error) => Universal.sendLog("error", `Bot error:\n${error}`));
    client.on("warn", (info) => Universal.sendLog("warn", `Bot warnning:\n${info}`));

    await createCommands();
    await client.login(process.env.DISCORD_TOKEN);
    await client.user.setActivity(`My prefix is: "${process.env.PREFIX}"`, { type: "PLAYING" });

    return client;

    async function createCommands() {
        client.commands = new Discord.Collection()
        const commandFiles = fs.readdirSync("./bot/commands")
                               .filter(file => file.endsWith(".js"));

        for(const file of commandFiles) {
            try { 
                const command = require(`./bot/commands/${file}`);
                await client.commands.set(command.name, command);
            } catch (error) {
                throw Universal.sendLog(
                    "error", 
                    `Failed to add ${file} to the Discord Collection\n${error}`
                ); 
            }
        }
        return Universal.sendLog("info", "Finished commands setup");
    }
}


