import React from 'react'
 //import Navbar from './component/Navbarss';
export default function Dashboard() {
  const url =  window.location.pathname ;
  const loginUser = JSON.parse(localStorage.getItem("LoginUser"));
  const username =loginUser[0].name;

  return (
    <div className='container'> 
      <h1 class="text-justify">Welcome {username} </h1>
    </div>
  )
}
