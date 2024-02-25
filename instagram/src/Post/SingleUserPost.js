import React from 'react'
import './SingleUserPost.css'
import PostGrid from './PostGrid';
import { BsGrid3X3 } from 'react-icons/bs';
import { BsBookmark } from 'react-icons/bs';
import { FiUserPlus } from 'react-icons/fi';

function SingleUserPost({post}) {
  return (
    <div className='SingleUserPost'>
     <div className="tabs">
        <ul>
            <li className='tagged-topline'><BsGrid3X3/>POSTS</li>
            <li><BsBookmark/>SAVED</li>
            <li className='tagged'><FiUserPlus/>TAGGED</li>
        </ul>
     </div>
     <div className="post-grid">
        {     
        post.map((post=>(
              <PostGrid key={post.post_id} post={post} />
        )))
        }
      
      
     </div>
    </div>
  )
}

export default SingleUserPost
