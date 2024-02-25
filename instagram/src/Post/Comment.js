import React, { useEffect, useState } from 'react'
import "./Comment.css"
import SingleComment from './SingleComment'
import {useStateValue} from '../StateProvider/StateProvider'

function Comment({url, post_id,closeModal}) {
  const [comment, setComment] = useState('');
  const [{username}] = useStateValue()
  const [showComment, setShowComment] = useState([])
   const [commenter, setCommenter] = useState([])
  const postComment= async()=>{
    try {
      const body = {comment, username, post_id};
      await fetch("http://localhost:5000/comment",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(body)
      });
      setComment('');    
    } catch (error) {
      console.error(error);
    }
  }
  const getComment = async()=>{
    try {
     const response= await fetch(`http://localhost:5000/comment?post_id=${post_id}`)
      const jsonData= await response.json()
      setShowComment(jsonData);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(()=>{
    getComment();
   
  },[showComment])

  const close=()=>{
    closeModal();
  }
 
  const getUploaderDetails=async()=>{
    try {
      const username = showComment.uploader;
      const response = await fetch(`http://localhost:5000/commenter?username=${username}`)
      const jsonData = await response.json()
      setCommenter(jsonData)

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(()=>{
 
    getUploaderDetails();

  },[])
  return (
    <div className='comment'>
        <div className="overlay" onClick={close}></div>
   <div className="commentmodal">
        <div className="post-image-area">
    <img src={url} alt="" />
        </div>
        <div className="comment-area">
       <h2>Comments</h2>
       
       <div className="single_comment_area">

        {
          showComment.map((showComment)=>(
            <SingleComment 
            key={showComment.comment_id}
            id={showComment.comment_id}
             uploader={showComment.uploader}
             comment={showComment.comment}
             commenter_pic={commenter.profile_pic}
             />
          ))
        }
       </div>  
        <div className="comment-input">
        <input type="text" placeholder='Add a comment...'  onChange={(e)=>setComment(e.target.value)} />
        <span onClick={postComment}>Post</span>
        </div>
        </div>
       
   </div>
    </div>
  )
}

export default Comment
