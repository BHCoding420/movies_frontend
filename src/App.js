import { BrowserRouter,Route, Switch } from "react-router-dom";
import './App.css'; 
//import Form from './components/Form';
import {Button,TextField, Typography,FormControl,Input,InputLabel,InputAdornment} from '@mui/material';

import { useEffect,useState } from 'react';
import axios from 'axios';  

//import Posts_Container from './components/Posts_Container'; 


import Main from "./components/Main";

import Login from "./components/Login"; 
import Signup from "./components/Signup";
function App() 
{ 
  
  return (
    
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} /> 
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
            </Switch>
        </BrowserRouter>
        

      
    
  );
}

export default App;
