import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { AddNote } from './AddNote';
import { Noteitem } from './Noteitem';
import { useNavigate } from 'react-router-dom';


export const Notes = (props) => {
  const navigate = useNavigate();
  const { notes, getNotes, refreshKey, editNote } = useContext(noteContext);
  const ref = useRef(null)
  const refClose = useRef(null)

  useEffect(() => {
    if (localStorage.getItem('authtoken')) {
      
      getNotes();
    }
    else{
      navigate('/login')
    }
  }, [refreshKey]);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, eid: currentNote._id});
  }

  const [note, setNote] = useState({eid: '', etitle: '', edescription: '', etag: 'default'});


  const handleClick = (e) => {
    editNote(note.eid, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note edited succesfully", 'success');

  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }


  
  
  return (
    <div className='row my-3'>
      <AddNote showAlert={props.showAlert}/>

      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<3 || note.edescription.length<3} className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>



      <h2>
        Your Notes
      </h2>
      <div className="container">
      {notes.length===0 && 'No notes yet'}
      </div>   
      {notes.map((note) => {
        return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
      })}
    </div>
  )
}
