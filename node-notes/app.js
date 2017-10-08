const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Description of note',
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('Add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;

console.log(argv);

var command = argv._[0];
if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created!');
        notes.logNote(note);
    } else {
        console.log('Note already exists!');
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    for (let note of allNotes) {
        notes.logNote(note);
    }
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed!' : 'Note not found!';
    console.log(message);
} else {
    console.log('Command not recognized!');
}
