import React from 'react'
import "./PostGrid.css"
function PostGrid({post}) {
  return (
    <div className='Postrid'>

<img src={post.url} alt=""  />  
            
{/* {console.log(post)}   */}
    </div>
  )
}

export default PostGrid
