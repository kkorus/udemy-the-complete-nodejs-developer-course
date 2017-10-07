console.log('Starting notes.js');

const fs = require('fs');

var addNote = (title, body) => {
    var notes = [];
    var note = {
        title,
        body
    };

    notes.push(note);
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var getAll = () => {

};

var getNote = (title) => {

};

var removeNote = (title) => {

};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};