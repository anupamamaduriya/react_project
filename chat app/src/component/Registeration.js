import { useState ,useEffect,useId } from 'react'
import { Form, Alert } from 'react-bootstrap';
import { useNavigate ,Outlet, Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
//import Login from "./component/Login";

function Registeration() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setcPassword] = useState("");
  

    const [flag, setFlag] = useState(false);
    const [cflag, setcFlag] = useState(false);
    const [userFlag, setuserFlag] = useState(false);

    const nav = useNavigate(); 
  

    // on form submit...
    function handleFormSubmit(e) { 
        console.log('submit');
        // console.log(userinfo);
        const users = localStorage.getItem("Users")?JSON.parse(localStorage.getItem("Users")):[];
        setFlag(false);
        setcFlag(false);
        setuserFlag(false);

        e.preventDefault();
        if (!name || !email || !password || !cpassword) {
            console.log (name,email,password,cpassword);
            setFlag(true);

        } else { 
            if(password !==cpassword){
                setcFlag(true);
            }else{
              console.log(users);
              
                let i=0;
                users.map((curElem) => {
                    if (curElem.email === email) {
                       return  setuserFlag(true);
                    }
                    
                  });

                  if(!userFlag){
                    users.push({
                      name:name,
                      email:email,
                      password:password,
                      id:uuid ()
                      
                  });
                    localStorage.setItem("Users",JSON.stringify(users));
                      nav("/login");

                  }

           
        }

    }
}

    // Directly to the login page
    // function handleClick() {
    //     setLogin(!login)
    // }

    // // Company Info
    // function infoClick() {
    //     setInfo(!info)
    // }



    return (
        <>
        <section    style={{ 
        backgroundImage: `url("https://via.placeholder.com/500")` 
        }}>
 
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{borderRadius:15}}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>
              {flag &&
                    <Alert color='primary' variant="danger" >
                        Every Field is important!
                </Alert>
                }

                {cflag &&
                    <Alert color='primary' variant="danger" >
                        Password and Confirmed Password not Matched !
                </Alert>
                  }


                {userFlag &&
                    <Alert color='primary' variant="danger" >
                        Username Already exist !
                </Alert>
                  }
              <form  onSubmit={handleFormSubmit}>

                <div className="form-outline mb-4">
                  <input type="text" id="form3Example1cg" className="form-control form-control-lg" onChange={(event) => setName(event.target.value)}/>
                  <label className="form-label" for="form3Example1cg">Your Name</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="email" id="form3Example3cg" className="form-control form-control-lg" onChange={(event) => setEmail(event.target.value)}/>
                  <label className="form-label" for="form3Example3cg">Your Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4cg" className="form-control form-control-lg"  onChange={(event) => setPassword(event.target.value)}/>
                  <label className="form-label" for="form3Example4cg">Password</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4cdg" className="form-control form-control-lg" onChange={(event) => setcPassword(event.target.value)} />
                  <label className="form-label" for="form3Example4cdg">Repeat your password</label>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Have already an account? 
                {/* <a href="#!" className="fw-bold text-body"><u>Login here</u></a> */}
                <Link className="nav-link" to="/login">Login here</Link>
               
                </p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</>
)
}


export default Registeration;



