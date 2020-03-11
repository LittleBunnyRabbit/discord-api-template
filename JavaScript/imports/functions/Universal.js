/**
 * Logger.
 * @param {('error'|'warn'|'info'|'debug'|'command')} [type=info] Type of the output
 * @param {String} message Message that you want to send to the console
 */
exports.sendLog = (type = "info", message) => {
    const isLinux = process.platform === "linux";
    const today = new Date();
    const date = ("0" + today.getDate()).slice(-2) + "/" 
               + ("0" + (today.getMonth() + 1)).slice(-2) + "/" 
               + today.getFullYear() + " " 
               + ("0" + today.getHours()).slice(-2) + ":" 
               + ("0" + today.getMinutes()).slice(-2) + ":" 
               + ("0" + today.getSeconds()).slice(-2);

    const prefixFormat = (type, start = "", end = "") => `${start}[${date}] ${type} |${end}`;
    const prefix = ({
        "info":    { name: "INFO ", color: "\x1b[36m" },
        "debug":   { name: "DEBUG", color: "\x1b[35m" },
        "error":   { name: "ERROR", color: "\x1b[31m" },
        "warn":    { name: "WARN ", color: "\x1b[33m" },
        "command": { name: "COMD ", color: "\x1b[32m" }
    })[type];
    const prefixColor = isLinux ? prefix.color : "";
    const prefixEnd = isLinux ? "\x1b[0m" : "";
    const prefixText = prefixFormat(prefix.name, prefixColor, prefixEnd);
    return console.log(`${prefixText} ${message}`);
}