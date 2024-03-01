import {useState} from 'react';
//import Inputform from './component/Inputform';
import Navbar from './component/Navbar';
import './App.css';
//import Alert from './component/Alert';
import Home from './component/Home';
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import Registeration from './component/Registeration';
import UserList from './component/UserList';
import Manage_chats from './component/Manage_chats';
import ManageDocument from './component/ManageDocument';
import { BrowserRouter, Routes, Route,Link,Switch } from 'react-router-dom';



function App() {
  const [mode,setMode]=useState("light");
  const [alert,setAlert]=useState('primary');
  const [activeClass,setactiveClass]=useState('');

  // const url =  window.location.pathname ;
  // console.log(url);
  // if(url==='/dashboard'){
  //   setactiveClass("active");
  // }else{
  //   setactiveClass("");
  // }
  
  const toggleMode =() =>{
    console.log(mode);
        if(mode==='light'){
          setMode('dark');
          setAlert('success');
        }
        else{
          setMode('light');
          setAlert('danger');
        }

  }
  return (
    <>
     
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/login"  element={<Login/>} />
          <Route path="/register" element={<Registeration />} /> 
          <Route path='/' element={<Navbar  />} >
             <Route index  path='/dashboard' element={<Dashboard/>} />

             <Route index  path='/userlist' element={<UserList/>} />
             <Route index  path='/manage_chats' element={<Manage_chats/>} />
             <Route index  path='/manage_document' element={<ManageDocument/>} />
          </Route>
          </Routes>
        </BrowserRouter>


    </>
  );
}

export default App;
