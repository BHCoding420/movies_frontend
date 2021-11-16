import React,{useState,useEffect} from 'react'
import {Button,TextField, Typography,FormControl,Input,InputLabel,InputAdornment,Popover,Grid,Card,CardContent,Select,OutlinedInput,MenuItem,Checkbox,ListItemText,RadioGroup,FormControlLabel,Radio} from '@mui/material';
import { getCurrentUser } from '../../services/authService';

const FilterComponent = ({Posts,setPosts,filterSchema,setfilterSchema}) => {

    
    const genres = ["Action","Adventure","Horror","Comedy","Drama","Mystery","Thriller","Cartoon","Anime","Hentai"] 

    //some stuff for filter popover 
    /*--------------------------------*/
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined; 
    /*--------------------------------*/
    //end of popver stuff

    useEffect(() => {
        console.log(filterSchema);
    },[filterSchema])

    useEffect(() => {
        console.log(Posts);
    },[Posts])

    const check_if_matches_Criteria = (post) => {  

        const finalSchema = {...filterSchema,Cast:filterSchema["Cast"].split('/')}
        
        var res = true; 
        if(getCurrentUser() && finalSchema["only_mine"] == true)
        {
            if(post.creator.creatorId !== getCurrentUser()._id)
            {
                console.log("post matches current user")
                return false;
            }
        }
        for(var key in finalSchema)
        {
           if(finalSchema[key] == 0)
           {
               continue;
           } 
          
    
           if(key == "tags" || key == "Cast" )
           {
                for(var i in finalSchema[key])
                {
                    let found = false;
                    for(var j in post[key])
                    {
                        console.log(finalSchema[key][i] + " ? " + post[key][j] + " : " + post[key][j].includes(finalSchema[key][i]))
                        if (post[key][j].toLowerCase().includes(finalSchema[key][i].toLowerCase()) == true)
                        {
                            console.log("item found successfullt")
                            found = true; 
                            break;
                        }
                    } 
                    if(found == false)
                    {
                        //console.log("item not found")
                        return false;
                    }
                }
    
            } 
            if(key == "score" || key == "NbOfLikes")
            {
                console.log(finalSchema[key].criteria); 
                console.log(post[key] + " : " + finalSchema[key].value)
                if(finalSchema[key].criteria == ">")
                {
                    if(!(post[key] > finalSchema[key].value) )
                    {
                        console.log("this is smaller"); 
                        return false
                    }
                } 
                else if(finalSchema[key].criteria == "<")
                {
                    if(!(post[key] < finalSchema[key].value) )
                    {
                        console.log("this is bigger"); 
                        return false
                    }
                } 
                else if(finalSchema[key].criteria == "=")
                {
                    if(!(post[key] == finalSchema[key].value) )
                    {
                        console.log("this is not equal"); 
                        return false
                    }
                }
            }
        } 
            
            
        return res;
    } 
    
    const filteredposts = () => {

        setfilterSchema(filterSchema);
        let filtered_posts_list = [];
        
        Posts.forEach(post => {
            if(check_if_matches_Criteria(post) == true)
            {
                console.log("post matches criteria \n " + post.title);
                filtered_posts_list.push(post);
            }
        } ) 
        console.log(filtered_posts_list);
        /*return filtered_posts_list;*/ 
        setPosts(filtered_posts_list); 
        
    }

    return (
        <>
        <Button style={{color:"goldenrod"}} aria-describedby={id}  onClick={handleClick}>
        <i class="fas fa-filter">
        
        </i>
    </Button> 
    <Popover
        
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
        vertical: 'top',
        horizontal: 'left', 
        }} 
        style={{minHeight:"200px"}}
    >
    <TextField inputProps={{
        style: { color: 'yellow',backgroundColor:'rgb(71, 64, 64)',margin:"0.5rem"}
      }} color="warning" name="Cast" onChange={(e) => {setfilterSchema({...filterSchema,[e.target.name] : e.target.value})}} placeholder="Enter Cast seperated by" label="Cast" variant="outlined" fullWidth value={filterSchema.Cast} required /> 

      {/*<TextField inputProps={{
        style: { color: 'yellow',backgroundColor:'rgb(71, 64, 64)',margin:"0.5rem"}
      }} color="warning" name="tags" onChange={(e) => {setfilterSchema({...filterSchema,[e.target.name] : e.target.value})}} placeholder="Enter tags seperated by" label="tags" variant="outlined" fullWidth value={filterSchema.tags} required /> 
        */} 
    
        <InputLabel style={{color: 'goldenrod'}}>Tag</InputLabel>
                                <Select
                                  fullWidth
                                  multiple
                                  value={filterSchema.tags} 
                                  name="tags"
                                  onChange={(e) => (setfilterSchema({...filterSchema,[e.target.name]:e.target.value}))}
                                  input={<OutlinedInput label="Tag" />}
                                  renderValue={(selected) => selected.join('/')}
                                  //MenuProps={MenuProps} 
                                  color="warning"
                                  focused
                                  
                                >
                                  {genres.map((name) => (
                                    <MenuItem key={name} value={name}>
                                      <Checkbox checked={filterSchema.tags.indexOf(name) > -1} />
                                      <ListItemText primary={name} />
                                    </MenuItem>
                                  ))}
                                </Select>

      <div style={{display: 'flex'}}>
        <select onChange={(e) => {setfilterSchema({...filterSchema, score : {...filterSchema.score,criteria: e.target.value}})}}>
            <option value=">">Greater than</option>
            <option value="<">less than</option>
            <option value="=">equal</option>
           
        </select>  

        <TextField inputProps={{
            style: { color: 'yellow',backgroundColor:'rgb(71, 64, 64)',margin:"0.5rem"}
          }} color="warning" type="number" onChange={(e) => {setfilterSchema({...filterSchema,score : {...filterSchema.score,value: e.target.value}})}} placeholder="Enter score" label="score" variant="outlined" fullWidth value={filterSchema.score.value} required /> 

      </div>  

      <div style={{display: 'flex'}}>
        <select onChange={(e) => {setfilterSchema({...filterSchema, NbOfLikes : {...filterSchema.NbOfLikes,criteria: e.target.value}})}}>
            <option value=">">Greater than</option>
            <option value="<">less than</option>
            <option value="=">equal</option>
           
        </select>  

        <TextField inputProps={{
            style: { color: 'yellow',backgroundColor:'rgb(71, 64, 64)',margin:"0.5rem"}
          }} color="warning" type="number" onChange={(e) => {setfilterSchema({...filterSchema,NbOfLikes : {...filterSchema.NbOfLikes,value: e.target.value}})}} placeholder="Enter Nb of likes" label="likes" variant="outlined" fullWidth value={filterSchema.NbOfLikes.value} required /> 

      </div> 
      {getCurrentUser() && <Button style={{display: 'flex'}} onClick={(e) =>{setfilterSchema({...filterSchema,only_mine:!filterSchema.only_mine})}}>
          My Posts  
          {filterSchema.only_mine === true ? <div style={{borderStyle:"solid",marginLeft:"1rem",padding:"0.1rem"}}><i class="fas fa-check"></i></div> : <div style={{borderStyle:"solid",marginLeft:"1rem",padding:"0.1rem"}}><i class="fas fa-times"></i></div>}
      </Button>}
     
        

      
    
      <Button onClick={() =>{filteredposts()}}>SubMit</Button> 
      <Button onClick={() =>{setfilterSchema({
        tags: [],
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
    })}}>Clear</Button>
      </Popover>
        </>
    )
}

export default FilterComponent
