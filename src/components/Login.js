import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    const [credentials, setCrendentials] = useState({ email: '', password: '' })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // redirect
            props.showAlert("Logged in succesfully", 'success');
            localStorage.setItem('authtoken', json.authtoken);
            navigate("/");
        }
        else {
            props.showAlert(json.errors[0].msg, 'danger');
        }
    }

    const onChange = (e) => {
        setCrendentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={credentials.password} placeholder="Password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>


        </div>
    )
}
