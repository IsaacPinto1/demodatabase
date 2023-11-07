import { useState } from "react";
import React from "react";
import { ReactDOM } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Register() {

  const [name, setName] = useState("")
  const [pw, setPw] = useState("")
  const [color, setColor] = useState("")
  const navigate = useNavigate()
  const [err, setErr] = useState(null)



  function handleSubmit(e){
    e.preventDefault()
    axios.post('http://localhost:3001/register', {name, pw, color})
    .then(result => {console.log(result)
      if(result.data.status === "Success"){
        navigate("/login")
      } else{
        setErr("409") // 409: user already exists
      }
    })
    .catch(err => {console.log(err)
     if(err.message === "Network Error"){
      setErr("123")
     } 
    })
  }

  function displayError(){
    if(err === null){
      return null
    } else if(err === "409"){
      return(<p>Name is taken!</p>)
    } else if(err === "123"){
      return(<p>Error connecting to server</p>)
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <>Name: </>
        <input onChange={(e) => setName(e.target.value)} value={name}></input>
        <br></br>
        <>Password: </>
        <input type="password" onChange={(e) => setPw(e.target.value)} value = {pw}></input>
        <br></br>
        <>Fav Color: </>
        <input onChange={(e) => setColor(e.target.value)} value = {color}></input>
        <br></br>
        <input type="submit" value="Register"></input>
      </form>
      {displayError()}
      <Link to="/login">Already have Account? Login</Link>
    </div>
  );
}

export default Register;
