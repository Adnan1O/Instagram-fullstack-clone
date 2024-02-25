import React, { useEffect, useState }  from 'react'
import './UserDetails.css'
import { BsGearWide } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {useStateValue} from "../StateProvider/StateProvider"
function UserDetails(props) {
  const [{user}] = useStateValue();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  

  const followersCount = async()=>{
    try {
      const username = user.username;
      const response = await fetch(`http://localhost:5000/followers?username=${username}`);
      const jsonData = await response.json()
      setFollowers(jsonData)
    } catch (error) {
      console.error(error);
    }
  }
  const followingCount = async()=>{
    try {
      const username = user.username;
      const response = await fetch(`http://localhost:5000/following?username=${username}`);
      const jsonData = await response.json()
      setFollowing(jsonData)
    } catch (error) {
      console.error(error);
    }
  }



useEffect(()=>{
  followersCount();
  followingCount();

},[])

  return (
    <div className='userdetails'>
    <div className="space"></div>
      <div className="main-body">
   <img src={user.profile_pic} alt="" />
   <div className="user-id">
    <div className="editprofile">
    <p>{user.username}</p>
  <Link to='/profilepic'><button>Edit Profile</button></Link>  
    <button>Ad tools</button>
    <BsGearWide/>
</div>
<div className="followers">
    <p><strong>{props.post.length}</strong> posts</p>
    <p><strong>{followers.length}</strong> followers</p>
    <p><strong>{following.length}</strong> following</p>
</div>
<div className="full-name">
  <p>{user.fullname}</p>
  <p className='gender'>{user.gender==="male"? 'He/Him': 'She/Her'}</p>
  <span>{user.bio}</span>
</div>
</div>
   </div>
   <div className="space"></div>
    </div>
  )
}

export default UserDetails
