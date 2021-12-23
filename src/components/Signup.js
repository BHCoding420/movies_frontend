import React ,{useState} from 'react'
import {TextField,Button,InputAdornment} from '@mui/material'; 

import { register } from "../services/userService";

const Signup = () => {
    const [signupData, setSignupData] = useState({name:"",email:"",password:""})  
    const [error,seterror] = useState({name:"",email:"",password:""})

    const [passType, setpassType] = useState("password")
    
    const change_value = (e) => {
        setSignupData({...signupData,[e.target.name]:e.target.value});
    } 

    const handlesubmit = async (e) => { 
        e.preventDefault(); 
        
            const res = await register(signupData)
            .then(res => window.location = "/")
            .catch(error => {console.log(error.response.data);seterror(error.response.data)}) 

            
            
            
            
        
    
    }
    return (
        <div style={{display: 'flex',
        justifyContent: 'center'}}> 
            
            <form style={{ maxWidth: 850,minWidth: 350,marginTop:"20px", padding: "20px 5px",backgroundColor:"rgb(58, 52, 52)"}} onSubmit={handlesubmit}> 
            <h1 style={{ textAlign: 'center' }}>Sign up</h1> 
            
            <TextField color="warning"  onChange={(e) => change_value(e)} placeholder="Enter name" name="name" label="name" variant="outlined" fullWidth value={signupData.name} required /> 
                <p  style={{ marginBottom: '40px' }}>{error.nameError}</p>

                <TextField color="warning"  onChange={(e) => change_value(e)} placeholder="Enter email" name="email" label="email" variant="outlined" fullWidth value={signupData.email} required /> 
                <p style={{ marginBottom: '40px' }}>{error.emailError}</p>

                <TextField color="warning"  onChange={(e) => change_value(e)} placeholder="Enter password" type={passType} name="password" label="password" variant="outlined" fullWidth value={signupData.password}  InputProps={{
                   
                    endAdornment: (
                      <InputAdornment position="end">
                      
                        {passType == "password" ? <i class="fas fa-eye-slash" onClick={(e) => setpassType("")} style={{cursor: 'pointer'}}></i> : <i class="fas fa-eye" onClick={(e) => setpassType("password")} style={{cursor: 'pointer'}}></i>}
                      
                      
                      </InputAdornment>
                    )
                  }} required /> 
                

 
                <p style={{ marginBottom: '40px' }}>{error.passwordError}</p>

                
                <Button type="submit"><h3>SIGN UP</h3></Button>
                
                
            </form>
        </div>
    )
}

export default Signup
