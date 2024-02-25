import React,{useEffect, useState} from 'react'
import './UserProfile.css'
import UserDetails from './UserDetails'
import { useStateValue } from '../StateProvider/StateProvider';
import SingleUserPost from '../Post/SingleUserPost';
function UserProfile() {
  const [{username}] = useStateValue();
  const [{user}] = useStateValue();
  const [profile, setProfile]= useState([]);
  const [post, setPost]  = useState([]);
  const getProfile = async()=>{
   try {
     const response = await fetch(`http://localhost:5000/profilepic?username=${username}`)
     const jsonData = await response.json();
     setProfile(jsonData)
    
   } catch (error) {
     console.error(error);
   }
  }

  const postCount = async()=>{
    try {
      const username = user.username;
      const response = await fetch(`http://localhost:5000/posts?username=${username}`);
      const jsonData = await response.json();
      setPost(jsonData.reverse());

    } catch (error) {
      console.error(error);
    }
  }
useEffect(()=>{
  //console.log(post)
  getProfile();
  postCount();

},[])
  return (
    <div className='userprofile'>

<div className="profile">
  <UserDetails profile={profile} post={post} />
  <SingleUserPost post={post} />
</div>
    </div>
  )
}

export default UserProfile
