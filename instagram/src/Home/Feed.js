import React ,{ useEffect, useState } from 'react'
import "./Feed.css"
import {useStateValue} from '../StateProvider/StateProvider'
import Post from '../Post/Post'
function Feed() {
  const [{user}] = useStateValue()
  const [followed, setFollowed] = useState([])
  const [following, setFollowing] = useState([])

const followedUsers= async()=>{
  try {
  const username= user.username;
  const response = await fetch(`http://localhost:5000/usersfollowings?username=${username}`);
  const jsonData = await response.json();
  setFollowed(jsonData);

  } catch (error) {
    console.error(error);
  }
}
const seprateFollowing=()=>{

  const followings= followed.map((followed)=>followed.following)
  setFollowing(followings)
  console.log(following)
}
//  useEffect(()=>{
//   followedUsers()
//   seprateFollowing()
 
//  },[])

  const [post, setPost] = useState([]);
  const getPost= async()=>{
   try {
     const response = await fetch(`http://localhost:5000/getpost?following=${following.join(',')}`);
     const jsonData = await response.json();
     setPost(jsonData.reverse())
   } catch (error) {
     console.error(error);
   }
 }

 useEffect(() => {
  followedUsers();
}, []);

useEffect(() => {
  seprateFollowing();
}, [followed]);

 useEffect(()=>{
 if(following.length > 0){
    getPost();
   //console.log(post)
 }
 },[following])
  return (
    <div className='feed'>
{
  post.map((post=>(
    <Post
        key={post.post_id} 
        id={post.post_id} 
        uploader={post.uploader}
        location={post.location}
        caption={post.caption}
        url={post.url} 
        time={post.time}
          />
  )))
}
  
    </div>
  )
}

export default Feed
