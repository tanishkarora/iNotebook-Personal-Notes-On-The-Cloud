import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    // const notesInitial = []
      
      


      //get notes
      
      const getNotes = async () => {
       
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('authtoken')

          },
         
        });
          const json = await response.json()
          // console.log(json);
          setNotes(json);
          // setRefreshKey(refreshKey+1);

        
      }

      //Add a note
      const addNote = async (title, description, tag) => {
       
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('authtoken')

          },
          body: JSON.stringify({title, description, tag}) 
        });
        await response.json();



        setRefreshKey(refreshKey+1);
      }
      // Delete a note
      const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('authtoken')
          },
         
        });
          await response.json()
          setRefreshKey(refreshKey+1);
          // console.log(json);
          // setNotes(json);
          // setRefreshKey(refreshKey+1);

      }
      // Edit a note
      const editNote = async (id, title, description, tag) => {    
        
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('authtoken')

          },
          body: JSON.stringify({id, title, description, tag}), 
          
        });
        await response.json();
        // console.log(id, title, description, tag);
        



        setRefreshKey(refreshKey+1);
      }
      const [notes, setNotes] = useState([])

      const [refreshKey, setRefreshKey] = useState(0)

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, refreshKey, setRefreshKey, getNotes}}>
        {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;