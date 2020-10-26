fs = require('fs');
const config = require('./config.json')


function readChat() {
    fs.readFile(config.minecraft.logLocation, 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    console.log(data);
    });
}

module.exports = {readChat};