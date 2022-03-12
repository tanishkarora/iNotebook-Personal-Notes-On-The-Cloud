import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const s1 = {
        "name": "tony",
        "age": "30",
        
    };
    const [state, setState] = useState(s1);
    
    return (
        <NoteContext.Provider value={""}>
        {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;