import React, { useState, useEffect } from "react";
import axios  from "axios";
import { useHistory } from "react-router-dom";

const Login = ({setLoginUser}) => {
  
  const history = useHistory();

  const [user, setUser] = useState({
    email:"",
    password:""
  })
  const handleChange = e => {
    const {name, value} = e.target
    setUser({
      ...user,
      [email]:value
    })
  }

  const login = () => {

    axios.post("http://localhost:8000/api/user/sigin")
    .then(res => {
      alert(res.data.user);
      setLoginUser(res.data.user)
    })

    return(
      <>
        <div className="container mt-5">
        <h1>Login</h1>
        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-bod">
                <form action="POST">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input value={user.email} onChange={handleChange} placeholder="Email" type="email" className="form-control" name="username"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input value={user.password} onChange={handleChange} placeholder="Password" type="password" className="form-control" name="username"/>
                  </div>
                  <Link to="/secreats"><button onClick={login} className="btn btn-dark">Login</button></Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default Login;