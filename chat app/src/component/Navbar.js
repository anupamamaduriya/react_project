import { Outlet, Link,NavLink } from "react-router-dom";
import React, { useState ,useEffect} from 'react';
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [username, setUserName] = useState("");
  const [activePage, setactivePage] = useState('');
  const navigate = useNavigate();
  
   const url =  window.location.pathname ;
   console.log(url);
  const logout =() =>{
    localStorage.removeItem("LoginUser");
   // localStorage.setItem("LoginUser",'');
    navigate("/login");
  }
 
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('LoginUser'));
    if (storedData) {
      console.log(storedData[0].name);
      setUserName(storedData[0].name);
    }
   // console.log(76767);
  }, []);

const  getPageData = (data) =>{
        return () => {
          console.log(data)
      }
        //console.log(data)
}


   return(
    <>

      <div className="container">
            <div className='navbar'>
                <p className={url==='userList' ? "activePage" : ""}  onClick={getPageData('manage_users')}>
                <Link className="nav-link" to="/userlist">Manage Users</Link>
                </p> 

                <p className="" onClick={getPageData('manage_chats')}>
                  <Link className="nav-link" to="/manage_chats">Group Chat</Link>
                </p>

                <p className="" onClick={getPageData('manage_documents')}>
                <Link className="nav-link" to="/manage_document">Manage Document</Link>
                </p>
                <p className="" onClick={logout}>
                              Logout
                </p>
            </div>
      </div>

      <div className="container">
        <span style={{color:"green", backgroundColor:"lightblue"}}>Welcome  {username}</span>
      </div>

      <Outlet/> 
    </>
   )
}


