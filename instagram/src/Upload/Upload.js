import React, { useState } from 'react'
import './Upload.css'
import { BiArrowBack } from 'react-icons/bi';
import { storage } from '../Firebase/Firebase';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
import {useStateValue} from '../StateProvider/StateProvider';
function Upload(props) {
const closing=()=>{
    props.closeModal()
}
const [image, setImage] = useState(null);
//const [getUrl, setGetUrl] = useState('');
const [caption, setCaption] = useState('');
const [location, setLocation] = useState('');
const [{user}] = useStateValue();

const uploadimage=()=>{
  if(image === null) return;
  const imageRef = ref(storage, `images/${image.name + v4()}`)
  return uploadBytes(imageRef, image)
  .then((snapshot)=> getDownloadURL(snapshot.ref)
  .then((url)=>{ console.log(url)
     return url;
    })
 
  )
}
const uploadPost= async ()=>{
  const username= user.username;
try {
  const imageUrl = await uploadimage();
  const body = {username,imageUrl, caption, location}; 
  console.log(body)
 await fetch("http://localhost:5000/uploadpost",{
  method:"POST",
  headers:{
    'Content-Type': 'application/json'
  },
  body:JSON.stringify(body)
 
})
} catch (error) {
  console.error(error);
}
}
const run=()=>{
  uploadPost();
  closing();
}
return (
<div className='upload'>
<div className="overlay" onClick={closing}></div>
<div className="modal">
<header>
    <BiArrowBack onClick={closing}/>
    <h4>Create new post</h4>
    <span onClick={run}>Share</span>
</header>
<div className="main-area">
    <div className="image-area">
    <input type="file"  accept="image/*, video/*"  onChange={(e)=>setImage(e.target.files[0])} />
    </div>
    <div className="post-detail">
    <div className="user-img">
    <img src={user.profile_pic} height={40} alt="" />
    <p>{user.username}</p>
    </div>
    <input type="text" className='caption' onChange={(e)=>setCaption(e.target.value)} value={caption}  placeholder='Write a caption...' />
    <input type="text" className='location' onChange={(e)=>setLocation(e.target.value)} value={location} placeholder='Add Location' />
    <span className='not-available'>Accessiblity</span>
    <span className='not-available'>Advanced Settings</span>
    </div>   
</div>
</div>
</div>
  )
}

export default Upload
