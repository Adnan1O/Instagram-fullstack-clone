import './Post.css'
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { GoComment } from 'react-icons/go';
import { BsSend } from 'react-icons/bs';
import { BsBookmark } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import {useStateValue} from '../StateProvider/StateProvider'
import Comment from './Comment';

function Post(props) {
  const [{user}] = useStateValue();
  const [uploaderDetail, setUploaderDetail] =useState([])
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState([]);
  const [openComment, setOpenComment] = useState(false);
  const [commentCount, setCommentCount] = useState([])
  const CommentModal = ()=>{
    setOpenComment(!openComment)
  }

const UploaderProfile = async()=>{
  try {
    const username = props.uploader;
    const response = await fetch(`http://localhost:5000/uploaderpic/${username}`)
    const jsonData = await response.json();
    setUploaderDetail(jsonData)
  } catch (error) {
    console.error(error);
  }
}
const checkLikeList = async()=>{
  try {
    const username = user.username;
    const post_id = props.id;
    const response = await fetch(`http://localhost:5000/likelist?username=${username}&post_id=${post_id}`);
    const jsonData= await response.json();
    setLike(jsonData);

  } catch (error) {
    console.error(error);
  }
}
useEffect(()=>{
  UploaderProfile();
},[])


const likePost = async()=>{
  try { 
    const likedby = user.username;
    const post_id = props.id;
    const body = {likedby, post_id}
    await fetch("http://localhost:5000/like",{
      method:"POST",
      headers:{  'Content-Type' : "application/json"},     
      body: JSON.stringify(body)
    })
      setLike(true)

  } catch (error) {
    console.error(error);
  }
}
const unlikePost= async()=>{
  try {   
    const likedby = user.username;
    const post_id = props.id;
    const body = {likedby, post_id}
    await fetch("http://localhost:5000/unlike",{
      method:"DELETE",
      headers:{ 'Content-Type':'application/json'},
      body: JSON.stringify(body)
    })
    setLike(false)
  } catch (error) {
    console.error(error);
  }
}

const LikeCount = async()=>{
  try {
    const post_id = props.id;
    const response = await fetch(`http://localhost:5000/like?post_id=${post_id}`)
    const jsonData= await response.json();
    setLikeCount(jsonData)

  } catch (error) {
    console.error(error);
  }
}
useEffect(()=>{

  checkLikeList();
},[likePost])

useEffect(()=>{
  LikeCount()
},[like])

const getCommentCount=async()=>{
  try {
    const post_id= props.id;
    const response = await fetch(`http://localhost:5000/comment?post_id=${post_id}`)
    const jsonData = await response.json()
    setCommentCount(jsonData)
    
  } catch (error) {
    console.error(error);
  }
}
useEffect(()=>{
  getCommentCount();

},[props.id, openComment])


  return (
    <div className='post'>
      <div className="user-location">
      <img src={uploaderDetail.profile_pic}  alt="" />
      <div className='username-location' >
        <p>{props.uploader}</p>
        <span>{props.location}</span>
      </div>
      <span className='date'>• {props.time}</span>
      </div>
      <div className="img-video">
     
     {/* isVideo &&(<video src={props.url} alt='' height={530} controls />): */}
 <img src={props.url} alt='' height={530} />
     
      </div>
      <div className="like-comment">
        <div className="icons">
    <div className="four-icon">
      {
        like?(
          <AiFillHeart onClick={unlikePost} color='red'/>
        ):(
              <AiOutlineHeart onClick={likePost}  />
        )   
      }   
    
    <GoComment onClick={CommentModal}/>
    {
        openComment && <Comment url={props.url} post_id={props.id} closeModal={CommentModal} />
      }
    <BsSend className='send' />
    <BsBookmark className='bookmark'/>
</div>
<p className='like-no'>{likeCount.length} likes</p>
    </div>
<div className="user-caption">
<div className="first">
<p>{props.uploader}</p> 
<span>{props.caption}</span>
</div>
<div className="comment">
<span>View all {commentCount.length} comments</span>
<input type="text" placeholder='Add a comment...' />
</div>
</div>
  </div>
</div>
  )
}

export default Post
 