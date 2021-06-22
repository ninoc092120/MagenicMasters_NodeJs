const EventEmitter = require('events');
const notifier = require('node-notifier');
const fs = require('fs');

let filesWithName = '';
let nameFound = false;

class FileWatcher extends EventEmitter {
    findName = (path, nameToFind) => {
        console.log(`Watching path: ${path}`);
        fs.watch(path, (eventType, filename) => {
            fs.readdir(path, function (error, files) {
                if (error) throw error;
                files.forEach(file => {
                    readFileForName(path, file, nameToFind);
                });
            });
            if (nameFound) {
                this.emit('nameFoundOnFile', filesWithName);    
            }
        });
    };
}

const readFileForName = function(path, file, nameToFind) {
    fs.readFile(path + file, function (error, data) {
        let fileContent = data.toString();
        if(fileContent.toUpperCase().includes(nameToFind.toUpperCase())){
            filesWithName = file;
            nameFound = true;
        } else {
            nameFound = false;
        }
    });
};


module.exports = FileWatcher;