import React,{useEffect,useState} from 'react'
import {Button,TextField, Typography,FormControl,Input,InputLabel,InputAdornment,Popover,Grid,Card,CardContent} from '@mui/material';

import Post from './Post/Post'; 
import './Post_Container.css' 
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import SortBy from './SortBy';
import { padding } from '@mui/system'; 
import FilterComponent from './FilterComponent/FilterComponent';

import {getCurrentUser} from '../services/authService'; 
import { server_url } from "../services/authService";


const Posts_Container = ({Posts,setPosts,user,reviews,setreviews,OgPosts,setOgPosts}) => { 

    const [filterSchema, setfilterSchema] = useState({
        tags:[],
        Cast:"", 
    
        score: {
            criteria: ">", 
            value: ""
    
        }, 
        NbOfLikes: {
            criteria: ">", 
            value: ""
    
        }, 
        only_mine:false
    })
    
    const emptySchema = (Schema,search) =>{

        if(Schema.tags == 0 && Schema.Cast == 0 && Schema.score.value == 0   && Schema.NbOfLikes.value == 0 && search == "" && filterSchema.only_mine == false )
        {
            return true;
        } 

        return false;
    }
   
    const [isAscending,setisAscending] = useState(true);

    const Delete_Item = async (id_to_be_deleted) => {
        setPosts(Posts.filter((post) => {return post._id !== id_to_be_deleted}));  
        setOgPosts(OgPosts.filter((post) => {return post._id !== id_to_be_deleted }))
        //console.log(Posts.filter((post) => {return post !== post_to_be_deleted} )) 
        await axios.delete(`${server_url}/movies/` + id_to_be_deleted)
        .then((deleted) => console.log(JSON.stringify(deleted))) 

        // WHY THE HELL DIDN'T IT DELETE THE FIRST TIME???


    }  

    const filter_reviews = (reviews,post_id) => { 
        if(reviews !== null){
        reviews = reviews.filter((review) => {return review.movie_id === post_id}) 
        return reviews;
        } 
        return []
    } 

    const [sortValue, setsortValue] = useState("NbOfLikes")

    const [searchfield, setsearchfield] = useState("") 

    

    

    
    return (
        <div>
            <Grid>
                <Card className="poster-color" style={{ maxWidth: 850, margin: "0 auto" }}>
                    <CardContent className="poster-color" >
                            {/*<h1>{emptySchema(filterSchema,searchfield) ? "empty schema" : "not empty schema"}</h1>*/}
                            <div style={{display: 'flex',justifyContent: 'space-between',backgroundColor:'rgb(71, 64, 64)',paddingTop:"1rem",maxWidth:"95%",margin:"0 auto",borderRadius:"5px"}}>
                                <div style={{display: 'flex'}}>
                                    <SortBy sortValue={sortValue} setsortValue={setsortValue} />
                                    <Button style={{color:"goldenrod"}} onClick={() => setisAscending(!isAscending)}>
                                        {isAscending ? <i class="fas fa-sort-amount-down-alt fa-2x"></i> : <i class="fas fa-sort-amount-up fa-2x"></i> }
                                    </Button>  
                                   
                                </div>
                             
                                <div style={{display: 'flex'}}>
                                    <FilterComponent Posts={Posts} setPosts={setPosts} filterSchema={filterSchema} setfilterSchema={setfilterSchema} />
 
                                    <FormControl variant="outlined-basic" color="warning" focused>
                                        
                                        <InputLabel >
                                            search movies
                                        </InputLabel>
                                        <Input
                                            fullWidth
                                            onChange={(e) => setsearchfield(e.target.value)}  
                                            variant="warning"
                                            style={{color:"goldenrod",backgroundColor: "rgb(58, 52, 52)",marginBottom:"1rem",borderRadius:"25px"}} 
                                            
                                            startAdornment={
                                            <InputAdornment position="start">
                                                
                                                <SearchIcon style={{color:"goldenrod",marginLeft:"0.5rem"}} onClick={() =>{setPosts(Posts.filter(post => post.title.toUpperCase().includes(searchfield.toUpperCase())))}}  /> 
                                                
                                            </InputAdornment>
                                            }
                                        /> 
                                        
                                    </FormControl>
                                </div>
                             

                            </div>
                            
                            
                            {isAscending ? setPosts( Posts.sort((a, b) => (a[sortValue] > b[sortValue]) ? 1 : -1) ) : setPosts( Posts.sort((a, b) => (a[sortValue] < b[sortValue]) ? 1 : -1) )}  
                            
                            { emptySchema(filterSchema,searchfield) && setPosts(OgPosts)}
                            
                            {Posts.map((post) => (
                            <div className="poster-color" style={{marginBottom: '2rem'}} key={post._id}>
                                
                                <Post  key={post._id} post={post} Posts={Posts} setPosts={setPosts} user={user} reviews={filter_reviews(reviews,post._id)} setreviews={setreviews}/>  
                                <Button style={{display:'flex'}} onClick={() => Delete_Item(post._id)}>
                                {(getCurrentUser() !== null && getCurrentUser()._id === post.creator.creatorId) && <DeleteIcon style={{fontSize:'5rem',borderStyle:"solid",borderRadius:"10%",color:"rgb(118, 118, 118)"}} />}
                                </Button> 
                                
                            </div> 
                            
                            
                            
                               
                            ))}   
                            
                            
                            {/*JSON.stringify(Posts)*/}
                        
                        
                    </CardContent> 

                </Card> 
                
            </Grid>
        </div>
    )
}

export default Posts_Container
