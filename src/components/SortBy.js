import React,{useEffect} from 'react'
import {Button,FormControl,InputLabel,Select,MenuItem} from '@mui/material';

const SortBy = ({sortValue,setsortValue}) => {

    useEffect(() => {
        
        console.log(sortValue);
    }, [sortValue])
    
    return (
        <div>
            <FormControl >
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortValue} 
                    color="warning" 
                    label="LOL"
                    style={{maxWidth: "100px",color:"goldenrod"}}
                    onChange={(e) => {setsortValue(e.target.value)}}
                    focused>
                        <MenuItem value={"score"}>score</MenuItem>
                        <MenuItem value={"title"}>Title</MenuItem>
                        <MenuItem value={"NbOfLikes"}>Likes</MenuItem>
                        <MenuItem value={"ReleaseDate"}>Release Date</MenuItem>
                    </Select>
            </FormControl>
        </div>
    )
}

export default SortBy
