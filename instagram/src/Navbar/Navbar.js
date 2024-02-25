import React, { useState } from 'react' 
import './Navbar.css'
import logo from '../images/logo.PNG'
import { MdHomeFilled } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { MdOutlineExplore } from 'react-icons/md';
import { BiSolidMoviePlay } from 'react-icons/bi';
import { RiMessengerLine } from 'react-icons/ri';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FaInstagram } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import {Link} from 'react-router-dom'
import Upload from '../Upload/Upload';
import Logout from '../Components/Logout';
import Search from '../Search/Search';

function Navbar() {
  const [active, setActive] = useState(null);
  const [openmodal, setOpenmodal] = useState(false)
  const [openLogout, setOpenLogout] = useState(false)
  const [openSeach, setOpenSearch] = useState(false);

  const makeActive =(link)=>{
    setActive(link)
  }
  const openModal =()=>{
    setOpenmodal(!openmodal)
   
  }
  const logOut=()=>{
    setOpenLogout(!openLogout)
   
  }
  const search=()=>{
    setOpenSearch(!openSeach)
   
  }
 
return ( //style={{position: openmodal ? 'absolute' : 'sticky' }}
  <div className='navbar' style={{position: 'sticky' }}>
  <div className="home-logo">
   <Link to='feed' style={{textDecoration:'none', color:'black'}}>
    <img src={logo} alt="" height={38} /> <FaInstagram className='insta'/> </Link> 
  </div>
  <div className="nav-list">
   <Link to='feed' style={{textDecoration:'none', color:'black'}}>
    <p
    className={active === 'home' ? 'active':''}
    onClick={()=>makeActive('home')}
    ><MdHomeFilled/><span className='hide-text'>Home</span></p></Link> 
    
{
 openSeach &&(
  <Search close={search} />
 )
}
   <p className={active === 'search' ? 'active':''}
    onClick={search}><BsSearch/><span className='hide-text'>Search </span></p>


    <p className={active === 'explore' ? 'active':''}
    onClick={()=>makeActive('explore')}><MdOutlineExplore/><span className='hide-text'>Explore</span></p>

    <p className={active === 'reels' ? 'active':''}
    onClick={()=>makeActive('reels')}><BiSolidMoviePlay/><span className='hide-text'>Reels</span></p>

    <p className={active === 'messages' ? 'active':''}
    onClick={()=>makeActive('messages')}><RiMessengerLine/><span className='hide-text'>Messages</span></p>

    <p className={active === 'noti' ? 'active':''}
    onClick={()=>makeActive('noti')}><AiOutlineHeart/><span className='hide-text'>Notifications</span></p>

    <p className={active === 'create' ? 'active':''}
    onClick={openModal}><AiOutlinePlusSquare/><span className='hide-text'>Create</span></p>
 {
  openmodal &&(
    <Upload closeModal={openModal} />
  )
 }
  <Link to='profile' style={{textDecoration:'none', color:'black'}}>
   <p className={active === 'profile' ? 'active':''}
     onClick={()=>makeActive('profile')} 
    ><CgProfile/><span className='hide-text'>Profile</span></p></Link>
     {
    openLogout &&(
      <Logout />
    )
  }
  <p className='logoutmenu' onClick={logOut} ><GiHamburgerMenu/><span className='hide-text'>More</span></p>
 
    </div>
  </div>
)
}

export default Navbar
