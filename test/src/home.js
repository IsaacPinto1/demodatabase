import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Home({user, setUser}){

    const [color, setColor] = useState('');
    const [count, setCount] = useState('');
    const [name, setName] = useState('');
    const [newColor, setNewColor] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const handleFetchData = async () => {
            try {
                const searchId = user;
            
                const response = await axios.get(`http://localhost:3001/getUserData?_id=${searchId}`);
                /*Query is passed as a dictionary. Names used determine the keys for the dictionary
                To have multiple: ?_id=${searchId}&param1=${queryParam1}&param2=${queryParam2} */
                console.log(response.data);
                setColor(response.data.color)
                setCount(response.data.count)
                setName(response.data.name)
            } catch (error) {
                console.log(error);
            }
          };
    
        handleFetchData();
      }, [color, count]);

    const changeCount = async (val) => {
        try {
            const response = await axios.put(`http://localhost:3001/updateUserCount/${user}`, { count: count+val });
            /*State isn't updated until end of function, so must pass in count+1 as well as updating the state*/
            console.log(response.data); // The updated user data (including the new count)
            setCount(response.data.count)
          } catch (error) {
            console.error('Error updating user count:', error);
          }
        };

    const changeColor = async () => {
        try {
            //setColor(newColor)
            //setNewColor('')
            const response = await axios.put(`http://localhost:3001/updateUserColor/${user}`, { color: newColor });
            console.log(response.data); // The updated user data (including the new count)
            setNewColor('')
            setColor(response.data.color)
          } catch (error) {
            console.error('Error updating user count:', error);
          }
        };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/deleteDocument/${user}`);
            console.log(response.data); // Success message or error message from the server
            navigate("/login")
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };


    return(
        <>
        <h2>Home</h2>
        {/*<p>Hello {user}!</p>*/}
        <p>Your name is: {name}</p>
        <p>Your color is: {color}</p>
        <p>Your count is: {count}</p>
        <div>
            <p style={{display:"inline"}}>Change Color: </p>
            <input value ={newColor} onChange={(e) => setNewColor(e.target.value)}></input>
            <button onClick={changeColor}>Submit Change</button>
        </div>
        <div>
            <p style={{display:"inline"}}>Increase Count: </p>
            <button onClick={() =>changeCount(1)}>+1</button>
        </div>
        <div>
            <p style={{display:"inline"}}>Decrease Count: </p>
            <button onClick={() =>changeCount(-1)}>-1</button>
        </div>
        <Link to="/login" onClick={() =>setUser(null)}>Log Out</Link>
        <br></br>
        <br></br>
        <button onClick={handleDelete}>Delete Account</button>
        </>
    )
}

export default Home