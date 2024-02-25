const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")
const port = 5000
app.use(cors());
app.use(express.json());
const moment = require('moment');

//UPLOADING POST >>>>>>>>>>>>>>>>>>>>>>

app.post('/uploadpost', async(req,res)=>{
  try {
    //console.log(req.body)
   const {username, imageUrl, caption, location} = req.body
   const postingTime = moment().format('MMMM D');
    const addPost = await pool.query('INSERT INTO post (uploader,location,caption,url, time) VALUES ($1, $2, $3, $4, $5)',
    [username,location,caption, imageUrl,postingTime ]);
    res.json(addPost.rows[0])
  } catch (error) {
    console.error(error);
  }
})
// GET FOLLOWED USERS TO SHOW POSTS

app.get('/usersfollowings', async(req,res)=>{
  try {
    const {username} = req.query;
    const checkFollowing = await pool.query('SELECT * FROM follow WHERE follower=$1',[username]);
   res.json(checkFollowing.rows)
   //console.log(checkFollowing.rows)
  } catch (error) {
    console.error(error);
  }
})


//GET POST's >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.get('/getpost', async(req,res)=>{
  try {
   // console.log(req.query)
    const {following} = req.query
    const followingArray = following.split(',');
   // console.log(followingArray)
    const sendPost = await pool.query("SELECT * FROM post WHERE uploader =ANY($1)",
    [followingArray]);
    res.json(sendPost.rows)
   // console.log(sendPost.rows)
  } catch (error) {
    console.error(error);
  }
})

// UPLOADERS PROFILE_PIC >>>>>>>>>>>>>>>>>>>>>

app.get('/uploaderpic/:username', async(req,res)=>{
  try {
    const {username} =req.params;
    const picForFeed = await pool.query("SELECT * FROM users WHERE username=$1",[username]);
    res.json(picForFeed.rows[0]) 
  } catch (error) {
    console.error(error);
  }
})


app.post('/register', async(req,res)=>{
  try {
   const {username, password, email, fullname} = req.body
   const getUsername = await pool.query("SELECT * FROM users WHERE username=$1",[username])
   if(getUsername.rows.lenght > 0){
    return res.status(400).json({error:"the username already exist"})
   }
  const getEmail = await pool.query("SELECT * FROM users WHERE email=$1",[email])
  if(getEmail.rows.length > 0){
    return res.status(400).json({error: "email is already registered with another user"})
  }
  if(password.length < 8){
    return res.status(400).json({error:"the password must be alteast 8 characters long"})
   }
    const submitUser = await pool.query("INSERT INTO users (username, password, email, fullname) VALUES($1,$2,$3,$4)",[username, password, email, fullname])
    res.json({message: " Registrantion successful"})
  } catch (error) {
    console.error(error)
  }
})

app.get('/allusers', async (req,res)=>{
  try {
    const allusers = await pool.query("SELECT * FROM users")
    res.json(allusers.rows)
  } catch (error) {
    console.error(error);
  }
})
// PROFILE PIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.put("/profilepic/:username", async(req,res)=>{
  try {
   const {profileUrl, bio, gender} = req.body
   const {username} = req.params;
   console.log(username)
    console.log(req.body)
    const uploadProfile = await pool.query("UPDATE users SET profile_pic = $1, bio = $2, gender = $3 WHERE username = $4",
    [profileUrl, bio, gender, username])
    res.json(uploadProfile.rows[0])
  } catch (error) {
    console.error(error);
  }
})

app.get('/profilepic', async(req,res)=>{
  try {
    const {username} = req.query
    //console.log(username)
    const sendProfile = await pool.query(" SELECT * FROM profile WHERE uploader=$1",[username])
    res.json(sendProfile.rows)
  } catch (error) {
    console.error(error);
  }
})

// SEARCH >>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.get('/search', async(req,res)=>{
  try {
    const {searchWord} = req.query;
    //console.log(searchWord)
    const search = await pool.query("SELECT * FROM users WHERE username ILIKE $1",[`%${searchWord}%`])
    res.json(search.rows)
    //console.log(search.rows)
  } catch (error) {
    console.error(error);
  }
})

// SINGLE USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.get('/singleuser/:id', async(req,res)=>{
  try {
    const {id} = req.params;
    console.log(req.params)
    const sendSingleUser= await pool.query('SELECT * FROM users WHERE user_id=$1',[id])
    res.json(sendSingleUser.rows[0])
  } catch (error) {
    console.error(error);
  }
})

// FOLLOWERS FOLLOWING >>>>>>>>>>>>>>>>>>>>>

app.post('/follow', async(req,res)=>{
  try {
    const {follower, following} = req.body;
    // const alreadyFollowing = ("SELECT * FROM follow WHERE following=$1",[following])
    // if(alreadyFollowing.length > 0){
    //   res.json()
    // }
   const insertUsers = await pool.query("INSERT INTO follow (follower, following) VALUES ($1,$2)",
    [follower,following])
    res.json(insertUsers.rows[0])
  } catch (error) {
    console.error(error);
  }
})
// UNFOLLOWING >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.delete('/follow', async(req,res)=>{
  try {
    const {follower, following} = req.body;
    const unfollow = await pool.query("DELETE FROM follow WHERE follower = $1 AND following = $2",
    [follower, following])
    res.json(unfollow.rows[0])
  } catch (error) {
    console.error(error);
  }
})

// CHECK FOLLOWING STATUS >>>>>>>>>>>>>>>>>>>>>

app.get('/isfollowing', async(req,res)=>{
  try {
    const {follower, following} = req.query;
    console.log(follower, following)
    const result = await pool.query(" SELECT * FROM follow WHERE follower=$1 AND following=$2",
    [follower, following]);
    //console.log(check)
    const check = result.rows;
    if(check.length > 0){
      res.json(true)
    }else{
      res.json(false)
    }
  } catch (error) {
    console.error(error);
  }
})
// FOLLOWERS COUNT >>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.get('/followers', async(req,res)=>{
  try {
    const {username} = req.query;
    const checkFollowers = await pool.query('SELECT * FROM follow WHERE following=$1',[username]);
    res.json(checkFollowers.rows)
  } catch (error) {
    console.error(error);
  }
})

// FOLLOWINGS COUNT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.get('/following', async(req,res)=>{
  try {
    const {username} = req.query;
    const checkFollowing = await pool.query('SELECT * FROM follow WHERE follower=$1',[username]);
    res.json(checkFollowing.rows)
  } catch (error) {
    console.error(error);
  }
})

// POSTS COUNT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.get('/posts', async(req,res)=>{
  try {
    const{username} = req.query;
    const checkPosts = await pool.query(" SELECT * FROM post WHERE uploader=$1",
    [username]);
    res.json(checkPosts.rows);
  } catch (error) {
    console.error(error);
  }
})

// LIKE A POST
app.post('/like', async (req,res)=>{
  try {
    //console.log(req.body)
    const {likedby, post_id} = req.body
    const likePost = await pool.query("INSERT INTO likes (likedby, likedpost_id) VALUES ($1,$2)",
    [likedby, post_id])
    res.json(likePost.rows[0])
  } catch (error) {
    console.error(error);
  }
})

app.delete('/unlike', async (req,res)=>{
  try {
    console.log(req.body)
    const {likedby, post_id} = req.body
    const unlikePost = await pool.query("DELETE from likes WHERE likedby=$1 AND likedpost_id=$2",
    [likedby, post_id])
    res.json(unlikePost.rows )
  } catch (error) {
    console.error(error);
  }
})

// CHECK LIKED OR NOT >>>>>>>>>>>>>>>>>>>>>>>>

app.get('/likelist', async(req,res)=>{
  try {
    //console.log('thiss',req.query)
    const {username, post_id} = req.query;
    const Checklikelist= await pool.query("SELECT * FROM likes WHERE likedby=$1 AND likedpost_id=$2",
    [username, post_id])
   // console.log("checklist",Checklikelist.rows)
   //res.json(Checklikelist.rows)
    const check = Checklikelist.rows;

    //console.log('check',check)
    if (check.length > 0) {
     // console.log('this the ',check.length)
      res.json(true)
    } else {
      res.json(false)
    }
  } catch (error) {
    console.error(error);
  }
})
// LIKE COUNT CHECK >>>>>>>>>>>>>>>>>>>>>

app.get('/like', async(req,res)=>{
  try {
    const {post_id} = req.query;
    const checkLike = await pool.query("SELECT * FROM likes WHERE likedpost_id=$1",[post_id]);
    res.json(checkLike.rows)
  } catch (error) {
    console.error(error);
  }
})

// ADD A COMMENT >>>>>>>>>>>>>>>>>>>>>>>

app.post('/comment', async(req,res)=>{
  try {
    const {username, comment, post_id} = req.body
  
    const addComment = await pool.query("INSERT INTO comments (uploader, comment, post_id) VALUES ($1,$2,$3)",
    [username, comment, post_id])
    res.json(addComment.rows[0])
  } catch (error) {
    console.error(error);
  }
})

// get COMMENTS 

app.get('/comment', async(req,res)=>{
  try {
    const {post_id} = req.query
    //console.log(post_id)
    const getComment = await pool.query("SELECT * FROM comments WHERE post_id=$1",[post_id])
    res.json(getComment.rows)
  } catch (error) {
    console.error(error);
  }
})
// GET COMMENTERS DETSILD

app.get('/commenter', async(req,res)=>{
  try {
    const {username} = req.query;
    const commenterDetail = await pool.query("SELECT * FROM users WHERE username=$1",[username]);
    res.json(commenterDetail.rows)
    //console.log(commenterDetail.rows)
  } catch (error) {
    console.error(error);
  }
})
app.listen(port, ()=>{console.log(`running on port ${port}`)})
