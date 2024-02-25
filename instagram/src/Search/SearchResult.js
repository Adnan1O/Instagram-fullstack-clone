import React from 'react'
import './SearchResult.css'
import { useNavigate } from 'react-router-dom'
function SearchResult(props) {
  const navigate = useNavigate();
const singleUserPage=()=>{
  const id = props.id
  navigate(`home/singleuser/${id}`)
  props.close();
}
  

  return (
    <div className='searchuser' onClick={singleUserPage} >
<img src={props.profile_pic}  alt="" />
<div className="username-fullname">
    <h4>{ props.username }</h4>
    <span>{ props.fullname}</span>
</div>
    </div>
  )
}

export default SearchResult
