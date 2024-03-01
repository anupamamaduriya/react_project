import React, { useState } from 'react'
import { Outlet, Link } from "react-router-dom";
import { Form, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
// import Loginsuccess  from './Loginsuccess';
import { Navigate } from 'react-router-dom';
import './style.css';


  function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginfo, setLogininfo] = useState([]);
    const [flag, setFlag] = useState(false);
    const [invalidUser, setinvalidUser] = useState(false);
   // const [loginsuccess, setLoginsuccess] = useState(true);


//console.log(users);
    function handleFormSubmit(e) {
      const users = localStorage.getItem("Users")?JSON.parse(localStorage.getItem("Users")):[];
      console.log('submit');
          e.preventDefault();
      if (!email || !password) {
          console.log (email,password);
          setFlag(true);

      } else {

          setFlag(false);
         // console.log(email); console.log(password);
           if(users.length>0){

            users.map((curElem) => {

              if (curElem.email === email  && curElem.password === password) {
                const loginInfo = [];
                loginInfo.push({
                  name:curElem.name,
                  email:curElem.email,
                  id:curElem.id
              });
                localStorage.setItem("LoginUser",JSON.stringify(loginInfo));
                navigate("/userList");
              }
              else{
                setinvalidUser(true);
              }
            })

           }else{
            setinvalidUser(true);
           }
      }

    }
        return (
          <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white"   style={{borderRadius:15}}>
                {invalidUser &&
                      <Alert color='primary' variant="danger" >
                          Invalid email or Passowrd
                  </Alert>
                  }
                {flag &&
                      <Alert color='primary' variant="danger" >
                          Please enter  email and  Passowrd
                  </Alert>
                  }



                  <div className="card-body p-5 text-center">
        
                    <div className="mb-md-5 mt-md-4 pb-5">
                    <form  onSubmit={handleFormSubmit}>
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">Please enter your login and password!</p>
        
                      <div className="form-outline form-white mb-4">
                        <input type="email" id="typeEmailX" className="form-control form-control-lg"  onChange={(event) => setEmail(event.target.value)}/>
                        <label className="form-label" for="typeEmailX">Email</label>
                      </div>
        
                      <div className="form-outline form-white mb-4">
                        <input type="password" id="typePasswordX" className="form-control form-control-lg"  onChange={(event) => setPassword(event.target.value)} />
                        <label className="form-label" for="typePasswordX">Password</label>
                      </div>
        
               
        
                      <button className="btn btn-outline-light btn-lg px-1" type="submit">Login</button>
        
                    
                      </form>
                    </div>
        
                    <div>
                      <p className="mb-0">Don't have an account?
                      <Link className="nav-link" to="/register">Sign Up</Link> 
                    
                      </p>
                    </div>
        
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      );
    
}

export default Login;