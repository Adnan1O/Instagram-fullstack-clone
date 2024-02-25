import React, { useState, useEffect } from 'react'
import './Search.css'
import SearchResult from './SearchResult'
function Search({close}) {
    const [searchWord, setSearchWord] = useState('')
    const [searchUser, setSearchUser] = useState([])
    const search =async()=>{
        try {
    const sendWords = await fetch(`http://localhost:5000/search?searchWord=${searchWord}`)
     const jsonData= await sendWords.json()
     setSearchUser(jsonData)
    // console.log(jsonData)
    
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{
        if (searchWord.trim() !=='') {
            search();
 
        } else {
            setSearchUser([]);
        }
     
    },[searchWord])
  return (
    <div className='search'>
        <div className="search-input">
      <h2>Search</h2>
      <input type="text" 
      placeholder='Search'
      onChange={(e)=>setSearchWord(e.target.value)}
      />
      </div>
      <div className="results">
      {
           searchUser.map((searchUser=>(    
           <SearchResult key={searchUser.user_id}
           id={searchUser.user_id}
           username={searchUser.username}
            fullname={searchUser.fullname}
            profile_pic={searchUser.profile_pic}
            close={close}
           />
           )))
 
      }
   </div>
    </div>
  )
}

export default Search
