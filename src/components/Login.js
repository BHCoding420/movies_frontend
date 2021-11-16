import React,{useState} from 'react'
import {TextField,Button,InputAdornment} from '@mui/material'; 
import { login } from "../services/authService";


const Login = () => { 

    const [loginData, setloginData] = useState({email:"",password:""}) 
    const [error,seterror] = useState({email:"",password:""})

    const [passType, setpassType] = useState("password")

    const change_value = (e) => {
        setloginData({...loginData,[e.target.name]:e.target.value});
    } 

    const handlesubmit = async (e) => { 
        e.preventDefault(); 
        seterror({email:"",password:""})
        let Current_error = "";
        
            const res  = await login(loginData).catch((error) => {Current_error = error.response.data});   
            console.log(Current_error); 

            if(Current_error == "Invalid email"){
                seterror({email : Current_error,password:""});
            } 

            else if(Current_error == "Invalid password"){
                seterror({email :  "",password : Current_error});
            }
            if(res){
                window.localStorage.setItem("token", res.data); 
                window.location = "/";
            }
            
            //window.location = "/";
        
    
    }
    return (
        <div style={{display: 'flex',
        justifyContent: 'center'}} >
            <form style={{ maxWidth: 850,minWidth: 350,marginTop:"20px", padding: "20px 5px",backgroundColor:"rgb(58, 52, 52)"}} onSubmit={handlesubmit}>
                <h1 style={{ textAlign: 'center' }}>Log in</h1> 
                
                <TextField color="warning" onChange={(e) => change_value(e)} placeholder="Enter email" name="email" label="email" variant="outlined" fullWidth value={loginData.email} required /> 
                <p style={{ marginBottom: '40px' }} >{error.email}</p>

                <TextField color="warning" style={{ marginBottom: '40px' }} type={passType} onChange={(e) => change_value(e)} placeholder="Enter password" name="password" label="password" variant="outlined" fullWidth value={loginData.password}  InputProps={{
                   
                    endAdornment: (
                      <InputAdornment position="end">
                      
                        {passType == "password" ? <i class="fas fa-eye-slash" onClick={(e) => setpassType("")} style={{cursor: 'pointer'}}></i> : <i class="fas fa-eye" onClick={(e) => setpassType("password")} style={{cursor: 'pointer'}}></i>}
                      
                      
                      </InputAdornment>
                    )
                  }} required /> 
                <p style={{ marginBottom: '40px' }} >{error.password}</p>

                <Button type="submit"><h1>LOGIN</h1></Button>
                
                
            </form>
        </div>
    )
}

export default Login
