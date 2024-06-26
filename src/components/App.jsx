import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../pages/Login.jsx"
import Home from "../pages/Home"
import { Register } from '../pages/Register.jsx'
import Games from '../views/Games.jsx'
import GameDetails from '../views/GameDetails.jsx'
import GameForm from '../views/GameForm.jsx'

export const App = () => {

  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Games showAll={true} />} />
                <Route path="/games/:gameId" element={<GameDetails />} />
                <Route path="/newgame" element={<GameForm />} />
            </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
