console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
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
    notes.getAll()

} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        notes.logNotes(note);
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
