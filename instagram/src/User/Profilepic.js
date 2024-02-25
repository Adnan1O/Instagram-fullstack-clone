import React, { useState, useEffect } from 'react'
import './Profilepic.css'
import Footer from '../Login/Footer'
import {useStateValue} from '../StateProvider/StateProvider'
import {storage} from '../Firebase/Firebase'
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
function Profilepic() {
const [profile, setProfile] = useState(null)
const [bio, setBio] = useState('')
const [gender, setGender]= useState('')
const [{username}] = useStateValue();
const uploadProfile=()=>{
    if(profile === null) return;
    const imageRef = ref(storage, `profile/${profile.name + v4()}`)
    return uploadBytes(imageRef, profile)
    .then((snapshot)=> getDownloadURL(snapshot.ref))
    .then((url)=>{
        //console.log(url)
        return url;
    });
}

const uploadDetail = async()=>{
    try {
        const profileUrl= await uploadProfile();
        const body={profileUrl, bio, gender, } 
        await fetch(`http://localhost:5000/profilepic/${username}`,{
            method:'PUT',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)          
        });
        window.location.replace('/')
    } catch (error) {
        console.error(error);
    }
}


useEffect(()=>{
    console.log(username)
},[])
  return (
<div className='profilepic'>
    <div className="info-area">
    <h2>Edit Profile</h2>
<div className="rest">
<div className="label">
<label>Set Profile</label>
<label>Bio</label>
<label>Gender</label>  
</div>
<div className="all-input">
<input type="file"
 onChange={(e)=>setProfile(e.target.files[0])}
 />
<input type="text" placeholder='about you..' 
onChange={(e)=>setBio(e.target.value)} 
value={bio} />
<input type="text" placeholder='Male or Female' 
onChange={(e)=>setGender(e.target.value)}
value={gender} />
</div>
    
</div>
<button onClick={uploadDetail}>submit</button> 
</div>
    <Footer/>
</div>
)
}

export default Profilepic
