import './App.css';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Login from './Login/Login'
import Register from './Login/Register';
import Home from './Home/Home';
import UserProfile from './User/UserProfile'
import Feed from './Home/Feed';
import { useStateValue } from './StateProvider/StateProvider';
import { useEffect } from 'react';
import Profilepic from './User/Profilepic';
import Singleuser from './User/Singleuser';

function App() {
 const [{user}] = useStateValue();
const navigate = useNavigate()
useEffect(()=>{

  if(user){
   navigate('/home/feed')
  }
},[user,])
  return (
  <div className="App">
    <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/register' element={<Register/>}/>
    <Route path='/profilepic' element={<Profilepic/>} />
    <Route path='/home' element={<Home/>}>
    <Route path='home/singleuser/:id' element={<Singleuser/>}/>
      <Route path='profile' element={<UserProfile/>} />
      <Route path='feed' element={<Feed/>}/>
        </Route> 
    </Routes>
  </div>
  );
}

export default App;
