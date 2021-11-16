import React from 'react'
import StarIcon from '@mui/icons-material/Star'; 
import PersonIcon from '@mui/icons-material/Person'; 
import {Button} from '@mui/material'; 


const UserReviews = ({reviews,Posts,setViewComponent}) => {

    console.log(reviews);
    return (
        <div> 

                <i style ={{color:"yellow",cursor: "pointer"}} onClick={() => setViewComponent("posts_container")} class="fas fa-long-arrow-alt-left fa-3x"></i>
            
        {reviews && reviews.map((review) => (
            <div key={review._id} style={{borderStyle:'solid',borderColor:'rgb(71, 64, 64)',margin:'0 auto',maxWidth:"1100px"}}>
            
           

                <div style={{display: 'flex',justifyContent: 'space-between',padding:"0"}}>
                    <h5 style={{color: 'yellow',fontSize:"bold"}}>Movie : {Posts.find((post) => post._id == review.movie_id).title}</h5>
                    
                     
                    <h5 style={{color: 'yellow',fontSize:"bold",marginRight:"0.5rem"}}><StarIcon className="star"/>{review.score}
                   
                    </h5>
                </div> 

               

                <div style={{backgroundColor:'rgb(71, 64, 64)',paddingBottom:"0.8rem"}}>
                    <p  style={{textAlign:"left",minWidth:"100%",margin: "0.8rem 1rem"}}>{review.content} </p> 
                </div> 

                
                
                
                
            </div>
        ))
    }
        </div>
    )
}

export default UserReviews
