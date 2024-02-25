import React, { useState } from 'react'
import './Login.css'
import './Register.css'
import logo from '../images/logo.PNG'
import { AiFillFacebook } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate= useNavigate();
    const [email,setEmail] = useState('')
    const [fullname,setFullname] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

const submitUser =async()=>{
    
    try {
    const data = {email, fullname, username, password};
    console.log(data)
   const response = await fetch("http://localhost:5000/register",{
        method: "POST",
        headers:{ "Content-Type" : "application/json"},
        body: JSON.stringify(data)
    
    });
   if (response.ok) {
    const messageData = await response.json();
   const message = await messageData.message;
   localStorage.setItem("username", JSON.stringify(username))
   alert(message)
    window.location.replace('/profilepic')
   } else {
    const errorData = await response.json();
    const error = errorData.error;
    alert(error)
   }
     } 
     catch (error) {
        console.log(error.message)
    }
}

return (
    <div className="login-page">
<div className='register'>

<div className="login-section">
<div className="fill-details2">
    <img src={logo} alt="" />
    <div className="new-addition">
    <p className='friends'>Sign up to see photos and videos from your friends.</p>
    <button className='facebook-btn'><AiFillFacebook/>  Log in With Facebook</button>
    <span>OR</span>
    </div>
<div className="input-button">
    <input type="text" placeholder='Phone number, or email' value={email} onChange={(e)=>setEmail(e.target.value)} />
    <input type="text" placeholder='Full Name' value={fullname} onChange={(e)=>setFullname(e.target.value)} />
    <input type="text" placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)} />
    <input type="text" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
    <p>People who use our service may
        have uploaded your contact information
        to Instagram. <span style={{color:"#385185", cursor:"pointer"}}> Learn More</span></p>
        <p>By signing up, you agree to our <span style={{color:"385185", cursor:"pointer"}}> Terms , 
        Privacy Policy and Cookies Policy</span>.</p>
        <button onClick={submitUser}>Sign up</button>
</div>
</div>
<div className="sign-up">
 <p>Have an account?<Link to='/' style={{textDecoration:"none", 
 color:"#385185", fontWeight:"bold"}}>Log in</Link></p>
</div>
<div className="get-app">
    <p>Get the app.</p>
    <div className="play-store">
   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/180px-Google_Play_Store_badge_EN.svg.png?20220907104002" alt="" />
   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Get_it_from_Microsoft_Badge.svg/1024px-Get_it_from_Microsoft_Badge.svg.png" alt="" />
</div>
</div>

</div>

</div>
<Footer/>
</div>
  )
}

export default Register
