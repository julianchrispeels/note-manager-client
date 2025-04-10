const apiUrl = process.env.REACT_APP_API_URL;

const endpoint = `${apiUrl}/api/v1/notes`;

const headers = {
    'Content-Type': 'application/json',
}

// Fetch notes from the server
const fetchData = async (setNotes) => {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNotes(data);
    } catch (error) {
        console.error('Error loading note:', error);
    }
};

// Add a new note
const AddNote = async (note, setNotes) => {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(note)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        fetchData(setNotes);
    } catch (error) {
        console.error('Error creating note:', error);
    }
};

// Change the archived status of a note
const ChangeArchiveStatus = async (note, prevIsArchivedValue, setFlagArchivedMessage, setShowArchivedMessage, setNotes) => {
    try {
        const id = note.id;
        const updatedNote = {
            isArchived: !prevIsArchivedValue,
        };
        const response = await fetch(`${endpoint}/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(updatedNote),
        });
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        setFlagArchivedMessage(prevIsArchivedValue);
        setShowArchivedMessage(true);
        fetchData(setNotes);
        setTimeout(() => {
            setShowArchivedMessage(false);
        }, 3000);
    } catch (error) {
        console.error('Error updating the note:', error);
    }
};

// Edit a note
const EditeNote = async (title, text, editingNote, setEditingNote, setNotes) => {
    try {
        const id = editingNote.id;
        const updatedNote = {
            title: title,
            content: text
        };
        const response = await fetch(`${endpoint}/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(updatedNote)
        });
        if (!response.ok) {
            throw new Error(`Error updating the note: ${response.statusText}`);
        }
        setEditingNote(null);
        fetchData(setNotes);
    } catch (error) {
        console.error('Error updating the note:', error);
    }
};

const SelectNoteToEdit = (note, setEditingNote) => {
    setEditingNote(note);
};

// Remove a note from the box
const RemoveNoteFromBox = async (noteId, setShowDeletedMessage, setNotes) => {
    try {
        const response = await fetch(`${endpoint}/${noteId}`, {method: 'DELETE'});
        if (!response.ok) {
            throw new Error(`Error deleting the note: ${response.statusText}`);
        }
        setShowDeletedMessage(true);
        fetchData(setNotes);
        setTimeout(() => {
            setShowDeletedMessage(false);
        }, 3000);
    } catch (error) {
        console.error('Error deleting the note:', error);
    }
};

export {
    fetchData,
    AddNote,
    ChangeArchiveStatus,
    EditeNote,
    SelectNoteToEdit,
    RemoveNoteFromBox,
};