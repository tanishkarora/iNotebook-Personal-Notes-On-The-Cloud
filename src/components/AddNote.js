import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

export const AddNote = (props) => {
    const {addNote } = useContext(noteContext);
    
    const [note, setNote] = useState({title: '', description: '', tag: 'default'});

    const handleClick = async (e) => {
        e.preventDefault();
        await addNote(note.title, note.description, note.tag);
        setNote({title: '', description: '', tag: 'default'});
        props.showAlert("Note added succesfully", 'success');

    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className='container'><h2>
            Add a note
        </h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
                </div>
            
                <button type="submit" className="btn btn-primary" disabled={note.title.length<5 || note.description.length<5} onClick={handleClick}>Add note</button>
            </form></div>
    )
}
