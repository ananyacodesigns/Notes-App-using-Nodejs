const chalk =  require('chalk'); 
const yargs = require('yargs');
const notes = require("./notes.js");

//customize yargs version
yargs.version('1.1.0');

//create add command
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: { describe: 'note title',
        demandOption: true,
        type: 'string' //removes the boolean and changes it to empty string    
        },
        body: {
            describe: 'note body',
            demandOption: true,
            type: 'striing'
        },
    },
    handler: (argv)=> notes.addNote(argv.title, argv.body)
})

//create remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'removing a note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv)=>{
        notes.removeNote(argv.title);
    }
})
yargs.command({
    command:'list',
    describe: 'list all notes',
    handler: ()=> {
        notes.listNotes();
    }
})

yargs.command({
    command:'read',
    describe: 'read all notes',
    builder:{
        title:{
            describe: 'read note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv)=>{
        notes.readNote(argv.title);
    }
})


yargs.parse();
