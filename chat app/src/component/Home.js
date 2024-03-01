import React from 'react'
import { Link } from "react-router-dom";
import './style.css';

export default function Home() {
  return (
    <div className='container mt-4 center'>
            
            <h4 class="mb-3"> <center>Welcome to Users Module</center> </h4>
                           <br/>
                           <h5><center>Existing User </center></h5>
                           <div className="center1">
                            <button  className="btn btn-primary"> 
                             <Link className="nav-link" to="/login">
                            Login </Link></button></div>
                           <br/>
                           <h5><center>New User</center> </h5>
                           <div className="center1">
                            <button className="btn btn-primary  ">
                            <Link className="nav-link" to="/register">Register</Link></button></div>
                           <br/>
    </div>
  )
}

