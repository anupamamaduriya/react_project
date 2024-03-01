import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function Inputform() {
    let productStyle = {
        color: "white",
        backgroundColor: "pink",
        border: "2px solid red"
    };
  

    

const [email,setEmail]=useState("");
 
const changeToUpper =()=>{
    return setEmail(email.toUpperCase());
}


  return (
  <>
        <div className="container-lg">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Notes</Form.Label>
            {/* <textarea  name="email" cols="60" rows="5" onChange={(event)=>{setEmail(event.target.value)}}>{email} </textarea> */}
            <textarea name="postContent" rows={4} cols={40} onChange={(event)=>{setEmail(event.target.value)}} value={email}  />
            {/* <Form.Control type="text"   cols="40" rows="25"placeholder="Enter Notes" value={email} onChange={(event)=>{setEmail(event.target.value)}} />  */}
           
          </Form.Group>
    
          {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
          <Button variant="primary" onClick={changeToUpper} >
            Submit
          </Button>
        </Form>
        </div>
    </>
     
  )
}
