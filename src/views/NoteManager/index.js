import { useState, useEffect } from 'react';

import Header from './components/Header';
import InputContainer from './components/InputContainer';
import NotesContainer from './components/NotesContainer';
import Footer from './components/Footer';
import './styles.css';

import { fetchData, AddNote, EditeNote, RemoveNoteFromBox, SelectNoteToEdit, ChangeArchiveStatus } from '../../api';

export default function NoteManager() {

    const [notesArray, setNotes] = useState([]);
    const [editingNote, setEditingNote] = useState(null); // Selected Note to edit
    const [showArchivedMessage, setShowArchivedMessage] = useState(false);
    const [flagArchivedMessage, setFlagArchivedMessage] = useState(false);
    const [showDeletedMessage, setShowDeletedMessage] = useState(false);

    useEffect(() => {
        fetchData(setNotes);
    }, []);

    return (
        <div className='note-manager'>
            <Header />
            <div className='content'>
                <InputContainer
                    AddNote={AddNote}
                    editingNote={editingNote}
                    setEditingNote={setEditingNote}
                    EditeNote={EditeNote}
                    showDeletedMessage={showDeletedMessage}
                    showArchivedMessage={showArchivedMessage}
                    flag={flagArchivedMessage}
                    setNotes={setNotes}
                />
                <NotesContainer
                    onRemove={RemoveNoteFromBox}
                    onEdit={SelectNoteToEdit}
                    onArchive={ChangeArchiveStatus}
                    notesArray={notesArray}
                    setFlag={setFlagArchivedMessage}
                    setShowMessage={setShowArchivedMessage}
                    setNotes={setNotes}
                    setEditingNote={setEditingNote}
                    setShowDeletedMessage={setShowDeletedMessage}
                />
            </div>
            <Footer />
        </div>
    );
}