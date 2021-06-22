const notifier = require('node-notifier');
const yargs = require('yargs');
const FileWatcher = require('./FileWatcher');
const argv = yargs.argv;

const openToastNotification = (filename) => {
    // console.log('openToastNotification');
    notifier.notify({
        title: 'File Watcher',
        message: `Your name was mentioned on file: ${filename}!`
    });
};

const printToConsole = (filename) => {
    // console.log('printToConsole');
    console.log(`Your name was mentioned on file: ${filename}!`);
};

const fileWatcher = new FileWatcher();
fileWatcher.on('nameFoundOnFile', openToastNotification);
fileWatcher.on('nameFoundOnFile', printToConsole)

fileWatcher.findName(argv.path, argv.name);