import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      props.showAlert("Account created succesfully", 'success');
      localStorage.setItem('authtoken', json.authtoken);
      navigate("/");
      setCredentials({ name: '', email: '', password: '', cpassword: '' })
    }
    else {
      props.showAlert(json.errors[0].msg, 'danger');
    }

  }

  const changeHandler = (e) => {
    credentials[e.target.name] = e.target.value
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlor="name">Name</label>
          <input type="text" className="form-control" id="name" onChange={changeHandler} name="name" aria-describedby="emailHelp" placeholder="Enter Name" />
        </div>
        <div className="form-group">
          <label htmlor="email">Email address</label>
          <input type="email" className="form-control" id="email" onChange={changeHandler} name="email" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" onChange={changeHandler} name="password" required minLength={5} placeholder="Password" />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={changeHandler} name="cpassword" required minLength={5} placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
