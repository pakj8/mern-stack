import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {

    const [user, setUser] = useState({
        email:"",
        password:""
    })
    const handleChange = e => {
        const {email, value} = e.target
        setUser({
            ...user, [email]:value
        })
    }

    const makeRegister = () => {
        const {email, password} = user;
        if(email && password) {
            axios.post("http://localhost:8000/api/user/create", user)
            .then(res => console.log(res))        
        }else {
            alert("Invalid Input")
        };
    }

    return(
        <div className="container mt-5">
      <h1>Register</h1>
      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-bod">
              <form action="POST">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" name="username"/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" name="username"/>
                </div>
                <Link to="/secreats"><button onClick={makeRegister} className="btn btn-dark">Register</button></Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>    
    );
}

export default Register;