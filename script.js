// Retrieve notes from local storage or initialize an empty array
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Get DOM elements
const notesContainer = document.getElementById('notes-container');
const addNoteBtn = document.getElementById('add-note');
const titleInput = document.getElementById('note-title');
const contentInput = document.getElementById('note-content');
const searchInput = document.getElementById('search-input');

// Function to render notes in the DOM
function renderNotes(notesToRender = notes) {
    notesContainer.innerHTML = ''; // Clear existing notes
    notesToRender.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        // Create note HTML structure
        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <div class="note-actions">
                <button onclick="editNote(${index})">Edit</button>
                <button onclick="deleteNote(${index})">Delete</button>
            </div>
        `;
        notesContainer.appendChild(noteElement);
    });
}

// Function to add a new note
function addNote() {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (title && content) {
        notes.push({ title, content });
        saveNotes();
        renderNotes();
        // Clear input fields after adding note
        titleInput.value = '';
        contentInput.value = '';
    }
}

// Function to edit an existing note
function editNote(index) {
    const note = notes[index];
    // Populate input fields with note data
    titleInput.value = note.title;
    contentInput.value = note.content;
    // Remove the note from the array (it will be re-added on save)
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

// Function to delete a note
function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

// Function to save notes to local storage
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to search notes
function searchNotes() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm) || 
        note.content.toLowerCase().includes(searchTerm)
    );
    renderNotes(filteredNotes);
}

// Event listeners
addNoteBtn.addEventListener('click', addNote);
searchInput.addEventListener('input', searchNotes);

// Initial render of notes
renderNotes();


