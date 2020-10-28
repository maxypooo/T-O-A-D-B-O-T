const config = require('../../config.json')
const { exec } = require("child_process");

function runCommand(commandString) {
    exec(`screen -S minecraft -X stuff "${commandString}\n"`)
}

module.exports = runCommand;