import React,{useState,useEffect} from 'react' 
import { Grid,Card,CardContent,TextField,Dialog,DialogContent,DialogTitle,Button } from '@mui/material';
import './Post.css' 
import { height } from '@mui/system'; 
import EditIcon from '@mui/icons-material/Edit'; 
import StarIcon from '@mui/icons-material/Star'; 
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';  
import AddIcon from '@mui/icons-material/Add';

import DeleteIcon from '@mui/icons-material/Delete';
import Postreviews from './Postreviews/Postreviews';
import ReviewForm from './ReviewForm/ReviewForm';

import { useStateWithCallbackLazy } from 'use-state-with-callback'; 

import {getCurrentUser} from '../../services/authService';

import { server_url } from "../../services/authService";

const Post = ({Posts,setPosts,post,user,reviews,setreviews}) => { 

    let n = reviews.length; 

    const [currentScore, setcurrentScore] = useStateWithCallbackLazy(post.score); 
    const [currentLikes, setcurrentLikes] = useState(post.NbOfLikes);

    const [sliceValue, setsliceValue] = useState(100)

    const temp_post = post; 

    useEffect(() => {
      
      let score_reviews = 0; 
      for(var i = 0; i < reviews.length; i++) {
        score_reviews +=reviews[i].score;
      } 

      setcurrentScore((post.Init_score + score_reviews) / (reviews.length + 1),(count) => {
        const res = axios.patch(`${server_url}/movies/update/` + post._id, { score: count })
        .then((res)=> console.log(res))
        .catch(err =>console.log(err));
     }) 

      
    }, [reviews,post.Init_score]) 

    

    const [isLikedby, setisLikedby] = useState(false);
    useEffect(() => {
      if(getCurrentUser() != null)
      {
        setisLikedby(post.LikedBy.includes(getCurrentUser()._id))
      }
      
    }, [])


    const [Addreview, setAddreview] = useState(false);

    const CheckUser = (id) => {  
      if(user == null) {
        return false;
      }
      if(user._id === id){
        return true;
      } 
      return false;
    }
     

    const modify_element = (e,element) => { 
      const original_value = post[element];
       let i = Posts.findIndex((obj => obj[element] == original_value)); 
       //console.log(e.target.value); 
       Posts[i][element] = e.target.value;  
        

       //submitChanges(post._id,element);
       
    }

    //some shit for dialog popup 
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false); 
        
        
    };  

    const submitChanges = async (id,element) => { 
      handleClose();
      setPosts([...Posts]);  
      console.log(element); 
      
     
      const res = await axios.patch(`${server_url}/movies/update/` + id , { [element]: post[element] }).catch(err =>console.log(err));
      console.log(res.data[element]);

    }
    
    const [ChangeKey, setChangeKey] = useState("creator") 

    useEffect(async () => { 
      console.log(isLikedby);
      /*if(!isLikedby) {
        post.NbOfLikes++;
        
      } 
      else {
        post.NbOfLikes--;
       };*/
    }, [isLikedby])

    const likingFunctionality = async () => {

    setisLikedby(!isLikedby);
    if(!isLikedby){
      
      const res = axios.patch(`${server_url}/movies/update/` + post._id , { LikedBy: [...post.LikedBy,getCurrentUser()._id],NbOfLikes:post.NbOfLikes + 1 }).then((response) => console.log(response.data)).catch(err =>console.log(err));  
      
    } 
    else{ 
      
      const res = axios.patch(`${server_url}/movies/update/` + post._id , { LikedBy: post.LikedBy.filter((id) =>{return id != getCurrentUser()._id}) ,NbOfLikes:post.NbOfLikes - 1 }).then((response) =>console.log(response.data)).catch(err =>console.log(err)); 
      console.log(res.data);
    }
     
    
      
    }
    
    
    //end of shit for dialogue popup 
    var imgUrl = post.SelectedImg;
    var divStyle = { 
            borderStyle: 'solid', 
            borderRadius: '20px',
            backgroundImage: 'url(' + imgUrl + ')',
            minHeight:'100%',  
            minWidth:'100%', 
            maxWidth:'100%',
            backgroundPosition: 'center', /* Center the image */  
            backgroundRepeat: 'no-repeat', /* Do not repeat the image */  
            backgroundSize: '100% 100%', /* Resize the background image to cover the entire container */ 
            

            
        }

        const [message, setmessage] = useState("")
    return (
        <div>
          
           

            <Grid> 
                
                
                <Card className="main-container" style={{ maxWidth: 800, margin: "0 auto",position: "relative" }}>  
                    {/*<button style={{position:'absolute',borderColor:"yellow",top:'0.0000000000001px',left:'0.0000000002px',backgroundColor:'rgb(58, 52, 52)'}}>
                      <DeleteIcon style={{color:'yellow',backgroundColor:'rgba(255, 255, 255, 0)'}}/>
                      </button>*/}
                    
                    <CardContent className="main-container">
                       
                            <Grid className="main-container" container spacing={1}>  
                              <Grid xs={11} md={3} style={{height:'200px'}}    item>
                                  <div style={divStyle}>
                                    {/* BACKGROUND IMAGE */} 
                                    
                                  </div>
                              </Grid> 
                              <Grid xs={8} md={6}    item>
                                  <h1 className="movie_title"  style={{maxWidth:"80%",wordBreak: "break-word"}}>{post.title} {CheckUser(post.creator.creatorId) &&<EditIcon  onClick={() => {
                                    setChangeKey("title"); handleClickOpen()}} className="modify"/>} 
                                    </h1>
                              </Grid> 
                              <Grid xs={3} item>
                                  <p className="movie_score"><StarIcon className="star"/>{currentScore.toFixed(2)} {CheckUser(post.creator.creatorId) && <span>({post.Init_score})</span>}  {CheckUser(post.creator.creatorId) && <EditIcon onClick={() => {
                                    setChangeKey("Init_score"); handleClickOpen()}} className="modify"/>}<br/><br/>
                                  <PersonIcon className="star"/> {post.creator.creatorName}  {CheckUser(post.creator.creatorId) && <EditIcon onClick={() => {
                                    setChangeKey("creator"); handleClickOpen()}} className="modify"/>}</p> 
                                  
                              </Grid> 
                              <Grid xs={12}     item>
                                    <h6 style={{textAlign:"left"}}>
                                      {!isLikedby && <Button onClick={() => {if(getCurrentUser() != null) {likingFunctionality();post.NbOfLikes++} else {setmessage("You need to be logged in")}}} style={{color:"yellow"}}>
                                        <i class="far fa-heart"> : {post.NbOfLikes}</i>  
                                      </Button>} 

                                      {isLikedby && <Button onClick={() => {likingFunctionality();post.NbOfLikes--}} style={{color:"yellow"}}>
                                        <i class="fas fa-heart"> : {post.NbOfLikes}</i>  
                                      </Button>} 
                                      {message && <p>{message}</p>}
                                    </h6>
                                    
                                    
                                    
                                  <h3 className="movie_title">{post.description.slice(0,sliceValue)}<span style={{cursor: 'pointer'}} onClick={() => {if(sliceValue == 100) {setsliceValue(post.description.length)} else {setsliceValue(100)}} }>  ...</span> {CheckUser(post.creator.creatorId) &&<EditIcon onClick={() => {
                                    setChangeKey("description"); handleClickOpen()}} className="modify"/>} 
                                    </h3>
                              </Grid>

                              <Grid xs={12} style={{marginTop:'0.5rem',backgroundColor:'rgb(71, 64, 64)'}}    item>
                                  <h6 style={{textAlign:"left"}} >Cast : {post.Cast.map((actor,index) => <button key={index} className="rounded">{actor} </button>)}</h6> 
                                  <h6 style={{textAlign:"left"}} >Genres : {post.tags.map((genre,index) =>  <button key={index} className="rounded">{genre} </button>)}</h6> 
                                  <h6 style={{textAlign:"left"}} >Released on : {post.ReleaseDate}</h6> 

                              </Grid>
                                
                            </Grid>
                         
                    </CardContent>
                </Card>
            </Grid> 
            {(!Addreview && user && user._id != post.creator.creatorId)  && <Button style={{textDecoration:"underline yellow"}} onClick={()=> setAddreview(true)}><p><AddIcon/>Add a review</p></Button>}
            {Addreview && <ReviewForm setAddreview={setAddreview} movie_Id={post._id} user={user} reviews={reviews} setreviews={setreviews} post_score={post.score} setcurrentScore={setcurrentScore} />}                    
            <h2 style={{color:"yellow",textAlign:"left"}}>Reviews : ({n}) </h2>
            {reviews && <Postreviews reviews={reviews} setreviews={setreviews}/>}

            {<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Modify element
        </DialogTitle>
        <DialogContent>
        
          <TextField onChange={((e) => modify_element(e,ChangeKey) )}  placeholder="Enter the new value" label="Full Name" variant="outlined" fullWidth  required />
    
          <Button onClick={() => submitChanges(post._id,ChangeKey)}>exit</Button>
        </DialogContent>
            </Dialog>}
            
            
        </div>
    )
}

export default Post
