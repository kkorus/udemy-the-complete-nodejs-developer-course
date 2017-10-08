const fs = require('fs');

var fetchNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes-data.json'));
    } catch (error) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicates = notes.filter(note => note.title === title);
    if (duplicates.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    return fetchNotes().filter(note => note.title === title)[0];
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
    debugger;
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};


