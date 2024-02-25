import React, { useEffect, useState } from 'react'
import './Login.css'
import loginpage from '../images/loginpage.PNG'
import logo from '../images/logo.PNG'
import { AiFillFacebook } from 'react-icons/ai';
import { Link} from 'react-router-dom';
import Footer from './Footer';
import {useStateValue} from '../StateProvider/StateProvider'
function Login() {
  const [, dispatch] = useStateValue();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  const getUsers=async()=>{
    try {
      const response = await fetch("http://localhost:5000/allusers")
     const jsonData = await response.json();
      setUsers(jsonData);
  
    } catch (error) {
      console.error(error);
    }
  }
const handleLogin =(e)=>{
  e.preventDefault();
  let isLoggedIn = false;
  let user = null
  for( let i=0; i< users.length; i++ ){
    const currentUser= users[i];
    if(currentUser.username === username && currentUser.password === password){
    user = currentUser
    isLoggedIn=true;
    break;
    }
  }
  if (isLoggedIn) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('username', JSON.stringify(user.username));
    dispatch({
      type: "LOG_IN",  
      item: user,
    });
 
    window.location.replace('/home/feed')
  } else {
    alert("wrong user id or password")
  }
  }
  useEffect(()=>{
    getUsers();
  
  },[])
  return (
    <div className="login-page">
<div className='login'>
<div className="login-image">
    <img src={loginpage} alt="" />
</div>
<div className="login-section">
<div className="fill-details">
<img src={logo} alt="" />
<div className="input-button">
  <input type="text"
  value={username}
  onChange={(e)=>setUsername(e.target.value)}
    placeholder='Phone number, username, or email'  />

  <input type="text" 
  placeholder='Password' 
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
  />
  <button onClick={handleLogin}>Log in</button>
</div>
  <div className="facebook">
    <strong>OR</strong>
    <p><AiFillFacebook/>Log in with Facebook</p>
    <span>Forgot password?</span> 
  </div>
</div>
<div className="sign-up">
 <p>Don't have an account?<Link to='register' style={{textDecoration:"none", 
 color:"#385185", fontWeight:"bold"}}> Sign up</Link></p>
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

export default Login
