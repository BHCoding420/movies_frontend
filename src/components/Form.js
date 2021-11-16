import { TextField,Button,Typography,Grid,Card, CardContent,Slider,InputLabel,Select,OutlinedInput,MenuItem,Checkbox,ListItemText } from '@mui/material';
import React, { useEffect,useState } from 'react'; 
import FileBase from 'react-file-base64'; 
import './Form.css'; 
import axios, { Axios } from 'axios';
import { server_url } from "../services/authService";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  } 

 
const Form = ({Posts,setPosts,setopenform,user,OgPosts,setOgPosts}) => {  

    useEffect(() => {
    console.log(user)
        
    }, [user]) 

    useEffect(() => {
        console.log(Posts)
    },[Posts])
   
    const [error, seterror] = useState("")

    const [PostData,setPostData] = useState({
        
        title:'',
        description:'', 
        Init_score:0,
        score: 0,
        ReleaseDate: new Date(2018, 11, 24), 
        tags:[],
        Cast:'',
        reviews:[], 
        
        selectedImg:""
    });  
    


    const submitPost = (e) => {
        e.preventDefault();   
        seterror("") 
        console.log(PostData.selectedImg)
        if(PostData.selectedImg === "")
        {
            console.log("no im,age") 
            seterror("please select an image") 
            return;
        }
        


        
            setimgsrc(''); 
        if(!error)
        {
            const Post = {
                creator: { creatorId : user._id , creatorName : user.name },
                title: PostData.title, 
                description: PostData.description, 
                Init_score: PostData.Init_score, 
                score: PostData.Init_score, 
                ReleaseDate: PostData.ReleaseDate, 
                tags: PostData.tags, 
                Cast: PostData.Cast.split('/'), 
                  
                LikedBy:[], 
                NbOfLikes:0,
                SelectedImg: PostData.selectedImg
            }
        
        
            setopenform(false);

            
            
            fetch(`${server_url}/movies/add`, {
            method: "POST",
            body: JSON.stringify(Post),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => {response.json();console.log(response)}) 

            setPosts([...Posts,Post]);  
            setOgPosts([...OgPosts,Post]); 
            
            
        }
    
    } 

    const modifyvalue = (e,element) => { 
        //console.log(e.target)
        setPostData({...PostData,[element] : e.target.value}) 
        //console.log(PostData[element]);
    } 

    
    
    
    const [imgsrc, setimgsrc] = useState('')

    const genres = ["Action","Adventure","Horror","Comedy","Drama","Mystery","Thriller","Cartoon","Anime","Hentai"] 

    
        
    return (
        <div>
            
            {<Grid> 
                
                <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto",backgroundColor:"rgb(58, 52, 52)" }}>
                    <CardContent> 
                        <Typography className="error">{error}</Typography> 
                        <form  onSubmit={submitPost}>
                            <Grid  container spacing={1}>
                                
                                <Grid xs={12} item>
                                    <TextField inputProps={{
                                        style: { color: 'yellow' }
                                      }} color="warning" onChange={(e) => (modifyvalue(e,'title'))} placeholder="Enter movie name" label="Name of movie" variant="outlined" fullWidth value={PostData.title} focused required />
                                 </Grid>
                                <Grid item xs={12}>
                                    <TextField inputProps={{
                                        style: { color: 'yellow' }
                                      }} color="warning" multiline rows={4} onChange={(e) => (modifyvalue(e,'description'))}  placeholder="add description" label="description" variant="outlined" value={PostData.description} focused fullWidth required />
                                </Grid>
                                <Grid item xs={12}> 
                                      <Typography color="warning" variant="h6" style={{textAlign: 'left'}}>Score:</Typography>
                                    <Slider color="warning"  defaultValue={50} aria-label="Default" valueLabelDisplay="auto" min={0}
                                    max={10} onChange={(e) => (modifyvalue(e,'Init_score'))}/>
                                    {/*<TextField  type="number" InputProps={{ inputProps: { min: 0, max: 10 } }}  placeholder="Enter score " label="score" variant="outlined" value={PostData.Init_score} fullWidth required />*/}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField inputProps={{
                                        style: { color: 'yellow' }
                                      }} color="warning" onChange={(e) => (modifyvalue(e,'ReleaseDate'))} InputLabelProps={{ shrink: true, required: true }} type="date" label="ReleaseDate" placeholder="ReleaseDate" variant="outlined" value={PostData.ReleaseDate} fullWidth focused required />
                                </Grid> 
                                <Grid xs={12} item> 
                                <InputLabel style={{color: 'goldenrod'}}>Tag</InputLabel>
                                <Select
                                  fullWidth
                                  multiple
                                  value={PostData.tags}
                                  onChange={(e) => (modifyvalue(e,'tags'))}
                                  input={<OutlinedInput label="Tag" />}
                                  renderValue={(selected) => selected.join('/')}
                                  //MenuProps={MenuProps} 
                                  color="warning"
                                  focused
                                  
                                >
                                  {genres.map((name) => (
                                    <MenuItem key={name} value={name}>
                                      <Checkbox checked={PostData.tags.indexOf(name) > -1} />
                                      <ListItemText primary={name} />
                                    </MenuItem>
                                  ))}
                                </Select>
                                    {/*<TextField onChange={(e) => (modifyvalue(e,'tags'))} placeholder="Enter tags seperated by '/'" label="tags" variant="outlined" fullWidth value={PostData.tags} required />*/}
                                </Grid> 
                                <Grid xs={12} item>
                                    <TextField inputProps={{
                                        style: { color: 'yellow' }
                                      }} color="warning" onChange={(e) => (modifyvalue(e,'Cast'))} placeholder="Enter Actors seperated by '/' : Brad/Emma" label="cast members" variant="outlined" fullWidth value={PostData.Cast} focused required />
                                 </Grid>  

                                 <Grid xs={12} item> 
                                     <Typography color="warning" variant="h6" style={{textAlign: 'left'}}>Select An Image:</Typography>
                                        <FileBase 
                                        type="file"
                                        accept="image/*"  
                                        imagePreview={true}
                                        multiple={false} 
                                        onDone={(Added_file) => {setPostData({...PostData,selectedImg: Added_file.base64});setimgsrc(Added_file.base64)}}
                                        /> 
                                        { imgsrc && <img src={imgsrc}></img> }
                                 </Grid> 
                                 
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                                </Grid>
      
                            </Grid>
                         </form>
                    </CardContent>
                </Card>
            </Grid>} 
            <Button onClick={() => setopenform(false)}>
                Close form
            </Button>
            
           
        </div>
    )
}

export default Form
