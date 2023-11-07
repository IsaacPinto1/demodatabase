import { useState } from "react";
import React from "react";
import { ReactDOM } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login({setUser}) {

  const [name, setName] = useState("")
  const [pw, setPw] = useState("")
  const navigate = useNavigate()
  const [err, setErr] = useState(null)



  function handleSubmit(e){
    e.preventDefault()
    axios.post('http://localhost:3001/login', {name, pw})
    .then(result => {console.log(result)
        if(result.data.status === "Success"){
            setUser(result.data.id)
            navigate("/home")
        } else if(result.data.status === "Wrong Password"){
            setErr("wrongp")
        } else if(result.data.status === "No User Exists"){
            setErr("nousr")
        }})
    .catch(err => console.err(err))
  }

  function showError(){
    if(err === null){
        return null
    } else if(err === "wrongp"){
        return(
            <p>Wrong Password!</p>
        )
    } else if(err === "nousr"){
        return(
            <p>No Username Found</p>
        )
    }
  }

  return (
    <div>
        <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setName(e.target.value)} value={name}></input>
        <input type="password" onChange={(e) => setPw(e.target.value)} value = {pw}></input>
        <input type="submit" value="Submit"></input>
        {showError()}
      </form>
      <Link to="/register">New User? Register</Link>
    </div>
  );
}

export default Login
