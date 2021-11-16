import { Typography,TextField,Slider } from '@mui/material';
import axios from 'axios';
import { useState } from 'react'; 
import { server_url } from "../../../services/authService";

const ReviewForm = ({setAddreview,movie_Id,user,reviews,setreviews,post_score,setcurrentScore}) => { 

    const [Review, setReview] = useState({user:{},content:"",movie_id:"",score:0}) 

    var n = reviews.length;

    const submitReview = async  (e) => {
        e.preventDefault();
        const newReview = {
            user:{userId:user._id,userName:user.name} ,
            content:Review.content,
            movie_id:movie_Id, 
            score:Review.score,
        }
        console.log(newReview)
        //setreviews([...reviews,newReview])

        await axios.post(`${server_url}/reviews/add`,newReview)
        .then((response) =>{console.log(response);setreviews([...reviews,newReview]);})
        .catch((error) => {console.log(error)}) 

        
        
        
        




        
    }
    return (
        <div >
            <form onSubmit={submitReview} style={{backgroundColor:'rgb(71, 64, 64)'}}>
            <Typography color="warning" variant="h6" style={{textAlign: 'left'}}>Score:</Typography>

            <Slider color="warning"  defaultValue={50} aria-label="Default" valueLabelDisplay="auto" min={0}
            max={10} style={{maxWidth:"50%"}} onChange={(e) => { setReview( {...Review,score:e.target.value} );console.log(Review.score) }}/> 
            <div style={{borderColor:"yellow",borderStyle:"solid",padding:"2rem"}}>
                <TextField inputProps={{
                    style: { color: 'yellow' }
                }} color="warning" multiline rows={4} onChange={(e) => { setReview( {...Review,content:e.target.value} );console.log(Review.content) }}  placeholder="add review" label="your review" variant="standard" value={Review.content} fullWidth required />
            </div>
           
            <button type="submit">SUBMIT</button>
            <button onClick={()=> setAddreview(false)}>Close</button>
            </form>
        </div>
    )
}

export default ReviewForm
