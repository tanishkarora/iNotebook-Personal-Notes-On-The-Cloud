import React from 'react';

function Alert(props) {
    const capitalize = (word)=>{
        if (word==="danger") {
            word = "error"
        }
        const lower = word.toLowerCase()
        return lower.charAt(0).toUpperCase() + word.slice(1)
    }
    return (
        <div style={{height: '8px'}}>
        {props.alert && 
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalize(props.alert.type)}</strong>: {props.alert.message}
        </div>}
        </div>
    )
}

export default Alert;
