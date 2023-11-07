import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './login';
import Home from './home';
import Register from "./register";
import { useState } from "react";


function App(){

    const [user, setUser] = useState({})


    return(
        <BrowserRouter>
            <Routes>
                <Route path = '/register' element={<Register/>}></Route>
                <Route path = '/login' element={<Login setUser = {(name) => setUser(name)}/>}></Route>
                <Route path = '/home' element={<Home user={user} setUser={(name) => setUser(name)}/>}></Route>
                <Route path = "*" element={<Navigate to = "/login"/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App