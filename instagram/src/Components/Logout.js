import React from 'react'
import './Logout.css'
import { BsGearWide } from 'react-icons/bs';
import { BsClockHistory } from 'react-icons/bs';
import { BsBookmark } from 'react-icons/bs';
import { PiSunDimBold } from 'react-icons/pi';
import { MdOutlineReport } from 'react-icons/md';
import { useStateValue } from '../StateProvider/StateProvider';
import {useNavigate} from 'react-router-dom'
function Logout() {
  const navigate = useNavigate();
const [{user},dispatch] = useStateValue();
  const logOut =(e)=>{
    e.preventDefault();
    navigate('/',{ replace: true })
    localStorage.setItem('user', JSON.stringify(null))
    localStorage.setItem('username', JSON.stringify(null))
    dispatch({
      type: "LOG_OUT",
      item: user
    })

  }
  return (
    <div className='logout'>
      <span><BsGearWide/>Settings</span>
      <span><BsClockHistory/>Your Activity</span>
      <span><BsBookmark/>Saved</span>
      <span><PiSunDimBold/>Switch appearance</span>
      <div className='bold-line'>
        <span ><MdOutlineReport/>Report a problem</span>
      </div>
      
      <span>Switch accounts</span>
      <span onClick={(e)=>logOut(e)}>Log out</span>
    </div>
  )
}

export default Logout
