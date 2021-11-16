import React, { useState,useEffect } from 'react' 
import StarIcon from '@mui/icons-material/Star'; 
import PersonIcon from '@mui/icons-material/Person'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';  
import { getCurrentUser } from '../../../services/authService';
import { TextField,Dialog,DialogContent,DialogTitle,Button } from '@mui/material'; 

import { server_url } from "../../../services/authService";

const Postreviews = ({reviews,setreviews}) => { 

    

    const deleteReview = async (id) => { 
        const newa = reviews.filter(review => review._id !== id); 
        console.log(newa);
        //setreviews( reviews.filter(review => review._id !== id) ) 
        setreviews( newa);
        await axios.delete(`${server_url}/reviews/` + id)
        .then((deleted) => console.log(JSON.stringify(deleted)))
        
    } 

    const checkReview = async (user_id) => {
        if(getCurrentUser() == null) {
            return false
        } 
        if(getCurrentUser()._id === user_id){
            console.log(getCurrentUser()._id)
            console.log(user_id)
            return true
        } 
        return false;
    }

    //some shit for dialog popup 
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false); 
        
        
    }; 

    const [Element, setElement] = useState("content"); 

    const submitChanges = async (id,review) => { 
        
        
        
       //console.log(id)
        const res = await axios.patch(`${server_url}/reviews/update/` + id , { [Element]: review[Element] })
        .catch(err =>console.log(err));
        console.log(res);
        handleClose();
    }

    useEffect(() => {
        console.log(Element)
        
    }, [Element])

    
    return (
        <div> 
            {reviews && reviews.map((review) => (
                <div key={review._id} style={{borderStyle:'solid',borderColor:'rgb(71, 64, 64)',margin:'0.75rem 0',position:'relative'}}>
                
                {(getCurrentUser() != null && review.user.userId === getCurrentUser()._id) &&  
                <button onClick={()=>deleteReview(review._id)} style={{position:'absolute',borderColor:"yellow",top:'0.0000000000001px',left:'0.0000000002px',backgroundColor:'rgb(58, 52, 52)'}}>
                <DeleteIcon style={{color:'yellow',backgroundColor:'rgba(255, 255, 255, 0)'}}/>
                </button>}

                    <div style={{display: 'flex',justifyContent: 'space-between',padding:"0"}}>
                        <h5 style={{color: 'yellow',fontSize:"bold"}}><PersonIcon className="star"/>{review.user.userName}
                        
                        </h5> 
                        <h5 style={{color: 'yellow',fontSize:"bold",marginRight:"0.5rem"}}><StarIcon className="star"/>{review.score}
                        {(getCurrentUser() != null && review.user.userId === getCurrentUser()._id) && <EditIcon onClick={()=>{handleClickOpen();
                            setElement("score"); }}/>}
                        </h5>
                    </div> 

                   

                    <div style={{backgroundColor:'rgb(71, 64, 64)',paddingBottom:"0.8rem"}}>
                        <p  style={{textAlign:"left",minWidth:"100%",margin: "0.8rem 1rem"}}>{review.content} {(getCurrentUser() != null && review.user.userId === getCurrentUser()._id) && <EditIcon onClick={()=>{handleClickOpen();
                            setElement("content"); }}/>}</p> 
                    </div> 

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
                        
                          <TextField onChange={(e) => { setreviews( [...reviews,review[Element] = e.target.value] )} }  placeholder="Enter the new value" label="Full Name" variant="outlined" fullWidth  required />
                    
                          <Button onClick={() => {submitChanges(review._id,review)}}>Submit</Button>
                        </DialogContent>
                            </Dialog>}
                    
                    
                    
                </div>
            ))
        }
            
        </div>
    )
}

export default Postreviews
