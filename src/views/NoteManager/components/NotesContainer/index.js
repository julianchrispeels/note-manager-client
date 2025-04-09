import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faBoxArchive, faBoxesPacking } from "@fortawesome/free-solid-svg-icons";

import './styles.css';

export default function NotesContainer({ onRemove, onEdit, onArchive, notesArray, setFlag, setShowMessage, setNotes, setEditingNote, setShowDeletedMessage }) {

	const [optionSelected, setOptionSelected] = useState(false);

	// Handle the selection change between active and archived notes
	const handleSelectionChange = (event) => {
		setOptionSelected(!optionSelected);
	}

	// Handle the delete note button
	const handleDeleteNote = (event) => {
		const noteId = parseInt(event.target.parentElement.parentElement.id);
		onRemove(noteId, setShowDeletedMessage, setNotes);

	}

	return (
		<div className='notes-container'>
			<div className='notes-head'>
				<h2 className='notes-head-title'>My Notes</h2>
				<select value={optionSelected} onChange={handleSelectionChange} className='notes-selection'>
					<option value={false}>Active Notes</option>
					<option value={true}>Archived Notes</option>
				</select>
			</div>
			<div className='notes-grid-container'>
				{notesArray.filter(note => JSON.parse(note.isArchived) === JSON.parse(optionSelected)).map((note) => (
					<div className="note-item" key={note.id} id={note.id}>
						<div className="notes-header">
							<button title={JSON.parse(optionSelected) ? 'Unarchive' : 'Archive'} className='notes-archive-button' onClick={() => onArchive(note, optionSelected, setFlag, setShowMessage, setNotes)}>
								{JSON.parse(optionSelected) ? <FontAwesomeIcon icon={faBoxesPacking} /> : <FontAwesomeIcon icon={faBoxArchive} />}
							</button>
							<button title='Edit' className='notes-edit-button' onClick={() => onEdit(note, setEditingNote)}>
								<FontAwesomeIcon icon={faPenToSquare} />
							</button>
							<button id={note.id} title='Delete' className='notes-delete-button' onClick={handleDeleteNote}>
								<FontAwesomeIcon icon={faTrash} />
							</button>
						</div>
						<div className='note-item-content'>
							<h2 className='note-item-title'>{note.title}</h2>
							<p className='note-item-text' >{note.content}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}