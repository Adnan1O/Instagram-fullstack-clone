import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AiOutlineUserAdd } from 'react-icons/ai';
import './Singleuser.css'
import './UserDetails.css'
import {useStateValue} from "../StateProvider/StateProvider"
import SingleUserPost from '../Post/SingleUserPost'
function Singleuser() {
    const {id} = useParams()
    const [singleUser, setSingleUser] = useState([]);
    const [{user}] = useStateValue();
    const [isFollowing, setIsFollowing] = useState(false)
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [post , setPost] = useState([]);
// get the user
const getSingleUser = async()=>{
try {
    const response = await fetch(`http://localhost:5000/singleuser/${id}`)
    const jsonData = await response.json();
    setSingleUser(jsonData);
} catch (error) {
    console.error(error);
}
}
// check if already following or not

const checkFollowStatus = async()=>{
  try {
    const follower = user.username;
    const following = singleUser.username;
    const response = await fetch(`http://localhost:5000/isfollowing?follower=${follower}&following=${following}`)
   const jsonData = await response.json();
    setIsFollowing(jsonData);
  } catch (error) {
    console.error(error);
  }
}

useEffect(()=>{
getSingleUser();
},[id])



const Follow =async ()=>{
console.log(singleUser.username, user.username)
try {
  const follower = user.username;
  const following = singleUser.username;
  const body = {follower, following} ;
  await fetch("http://localhost:5000/follow",{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  setIsFollowing(true);
} catch (error) {
  console.error(error);
}
}
const Unfollow = async()=>{
  try {
    const follower = user.username;
    const following = singleUser.username;
    const body = { follower, following };
    await fetch(`http://localhost:5000/follow`,{
      method:"DELETE",
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(body)

    });
     setIsFollowing(false)
  } catch (error) {
    console.error(error);
  }
}

const Posts = async()=>{
  try {
    const username = singleUser.username;
    const response = await fetch(`http://localhost:5000/posts?username=${username}`);
    const jsonData = await response.json();
    setPost(jsonData);

  } catch (error) {
    
  }
}


const FollowersCount = async ()=>{
  try {
    const username = singleUser.username
    const response = await fetch(`http://localhost:5000/followers?username=${username}`);
   const jsonData = await response.json()
    setFollowers(jsonData)
    console.log(followers)
  } catch (error) {
    console.error(error);
  }
}
const FollowingCount = async()=>{
  try {
    const username = singleUser.username;
    const response = await fetch(`http://localhost:5000/following?username=${username}`);
    const jsonData = await response.json();
    setFollowing(jsonData)
  } catch (error) {
    console.error(error);
  }
}
useEffect(()=>{
  
  FollowersCount()
  FollowingCount()
  Posts()
},[isFollowing])

useEffect(() => {
  checkFollowStatus();
  console.log(isFollowing)
}, [Follow]);
return (
    <div className="overall" >
    <div className='userdetails'>
    <div className="space"></div>
    <div className="profile-postgrid">
      <div className="main-body">
   <img src={singleUser.profile_pic} alt="" />
   <div className="user-id">
    <div className="follow-message">
    <p>{singleUser.username}</p>
 <button className='follow-btn' onClick={ isFollowing? Unfollow: Follow}>
  {isFollowing ? 'unfollow':'follow'}
 </button>
    <button className='message-user'>Message</button>
    <AiOutlineUserAdd/>
</div>
<div className="followers">
    <p><strong>{post.length}</strong> posts</p>
    <p><strong>{followers.length}</strong> followers</p>
    <p><strong>{following.length}</strong> following</p>
</div>
<div className="full-name">
  <p>{singleUser.fullname}</p>
  <p className='gender'>{singleUser.gender==="male"? 'He/Him': 'She/Her'}</p>
  <span>{singleUser.bio}</span>
</div>
</div>
   </div>
   <div className="grid-area">
    <SingleUserPost post={post}/>
   </div>
</div>


   <div className="space"></div>
    </div>
    </div>
  )
}

export default Singleuser
