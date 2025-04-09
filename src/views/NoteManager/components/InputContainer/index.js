import { useState, useEffect } from 'react';

import './styles.css';

export default function InputContainer({ AddNote, editingNote, setEditingNote, EditeNote, showDeletedMessage, showArchivedMessage, flag, setNotes }) {

	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [showMessage, setShowMessage] = useState(false);

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	}

	const handleTextChange = (event) => {
		setText(event.target.value);
	}

	// Load the note to edit in the form if it is selected
	useEffect(() => {
		if (editingNote != null) {
			setTitle(editingNote.title);
			setText(editingNote.content);
		} else {
			setTitle('');
			setText('');
		}
	}, [editingNote]);

	// Handle the form submission to add or edit a note
	const handleSubmit = (event) => {
		event.preventDefault();
		if (editingNote != null) {
			EditeNote(title, text, editingNote, setEditingNote, setNotes);
		} else if (title && text) {
			const newNote = {
				title: title,
				content: text,
			};
			AddNote(newNote, setNotes);
		}
		setTitle('');
		setText('');
		setShowMessage(true);
		setTimeout(() => {
			setShowMessage(false);
		}, 3000);
	}

	// Handle the cancel button to clear the form
	const handleCancelButton = () => {
		setTitle('');
		setText('');
		setEditingNote(null);
	}

	return (
		<div className='sidebar-container'>
			<h2 className='sidebar-head-title'>{editingNote ? 'Edit Note' : 'New Note'}</h2>
			<form className='sidebar-new-note-box' onSubmit={handleSubmit}>
				<label className='sidebar-title'>
					Title
					<input
						placeholder='Enter note title'
						required className='sidebar-title-input'
						value={title} onChange={handleTitleChange}
						type="text" />
				</label>
				<label className='sidebar-text-field'>
					Text
					<textarea
						className='sidebar-text-field-input'
						value={text}
						onChange={handleTextChange}
						placeholder="Enter note text"
						required
					></textarea>
				</label>
				<div className='sidebar-buttons-container'>
					<button className={editingNote ? 'sidebar-button-edit' : 'sidebar-button-new'} type="submit">
						{editingNote ? 'Save Changes' : 'Save New Note'}
					</button>
					{editingNote && (<button className='cancel-button' onClick={handleCancelButton}>Cancel Changes</button>)}
				</div>
				{(showMessage && (<div className="sidebar-message">Note saved!</div>)) ||
					(showDeletedMessage && (<div className="sidebar-deleted-message">Note deleted!</div>)) ||
					(showArchivedMessage && (<div className="sidebar-archived-message">{!flag ? 'Note archived!' : 'Note unarchived!'}</div>))}
			</form>
		</div>
	);
}