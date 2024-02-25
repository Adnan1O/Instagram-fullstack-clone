import React from 'react'
import './SingleComment.css'
import { AiOutlineHeart } from 'react-icons/ai';
function SingleComment(props) {

  return (
    <div className='SingleComment'>
      <img src={props.profile_pic}  height={40} alt="" />
      <div className="username-comment">
        <h4>{props.uploader}</h4>
        <span>{props.comment}</span>
      </div>
      <AiOutlineHeart style={{fontSize:"15px", alignSelf:"center", width:"20px", marginRight:"5px"}} />
    </div>
  )
}

export default SingleComment
