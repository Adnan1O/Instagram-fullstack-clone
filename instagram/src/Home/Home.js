import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import './Home.css'
import { Outlet } from 'react-router-dom'
import { useStateValue } from '../StateProvider/StateProvider'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [{user}] = useStateValue();
const navigate = useNavigate();
useEffect(()=>{
  if(!user){
    navigate('/')
  }
},[user, navigate])
  return (
    <div className='home'>
      <Navbar/>
      <Outlet/>

    </div>
  )
}

export default Home
