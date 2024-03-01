import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

function UserList() {
  const [userData, setUserData] = useState([]);
  const [loginUser, setLoginUser] = useState(null);
//  const [loginUsername, setLoginUsername] = useState('');
  const [show, setShow] = useState(false);
  const [editItem, setEditItem] = useState('');
  const [editName, setEditName] = useState('');  
  const [editEmail, setEditEmail] = useState('');
  const [editIndex, setEditIndex] = useState('');
  const navigate = useNavigate();
  const handleClose = () => setShow(false);

  const handleShow = (email) => {
    console.log(email);
    const item_todo_edited = userData.find((curElem) => {
      if(curElem.email === email){
        return curElem;
      };
    });
    setEditItem(item_todo_edited);
    setEditName(item_todo_edited.name);
    setEditEmail(item_todo_edited.email);
    setEditIndex(item_todo_edited.id);
    //console.log(item_todo_edited);
    console.log(editItem);
   // setIsEditItem(index);
    //setToggleButton(true);
    setShow(true);
  }

  useEffect(() => {
    const storedData = localStorage.getItem('Users');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
    }
   // console.log(76767);
  }, []);
  //userData


  useEffect(() => {
    const storedLoginData = localStorage.getItem('LoginUser');
    if (storedLoginData) {
      const parsedData = JSON.parse(storedLoginData);
      setLoginUser(parsedData);
      console.log(loginUser);
    }else{
      navigate("/login");
    }
  }, []);
//loginUser

  const deleteItem =(email)=>{ 
    const confirmBox = window.confirm(
      "Do you really want to delete this user?"
    );
  if (confirmBox == true) {
      if(loginUser[0].email ===email){
        alert ("you can not delete your Details");
      }else{
        const newdata=  userData.filter((arrElement,index)=>{
                return  arrElement.email !==email;
        });
        // console.log(newdata);
        localStorage.setItem("Users",JSON.stringify(newdata));
        setUserData(newdata);
      }
  }
    
}

const saveEditData= ()=>{
  const findUser = userData.find( (selectItem) => selectItem.id == editIndex); 
  const updatedData = { ...findUser,name: editName, email: editEmail };
  const updatedloginUser = { ...loginUser, name: editName };
  console.log(updatedData);

  const newdata=  userData.filter((arrElement,index)=>{
                  return  arrElement.id !==editIndex;
                });
                
                newdata.push({
                  ...findUser,name: editName, email: editEmail 
                });
                console.log('updated array');
                console.log(newdata);
                // setUserData(updatedData);
                localStorage.setItem('Users', JSON.stringify(newdata));
                setUserData(newdata);
                //setUserData(newdata);

                if(loginUser[0].id ===editIndex){
                  const loginInfo = [];
                  loginInfo.push({
                    name:editName,
                    email:editEmail,
                    id:editIndex
                });
                  localStorage.setItem("LoginUser",JSON.stringify(loginInfo));
                
                }
                setShow(false);

}

 
  return (
    <>
  <div className="container">
		<div className="table-responsive">
			<div className="table-wrapper">
				<div className="table-title">
					<div className="row">
          <span> User List</span>
					</div>
				</div>
				<table className="table table-striped table-hover">
					<thead>
						<tr>
							
              <th  style={{width:"33%"}}>Name</th>
              <th style={{width:"33%"}}>Email</th>
              <th style={{width:"33%"}}>Action</th>
						</tr>
					</thead>
					<tbody>
          {    
              userData.map((item, index) => (
                 <tr key={index}>
                  
                      <td style={{width:"33%"}}>{item.name}</td>
                      <td style={{width:"33%"}}>{item.email}</td>   
                      <td style={{width:"33%"}}> 
                       <Button className='btnn' style={{marginRight:"5px"}} onClick={()=>handleShow(item.email)}>
                    Edit
                  </Button>
                  {/* <button variant="primary" onClick={() => handleEdit(index)}></button> */}
                  <Button className='btnn' onClick={()=>deleteItem(item.email)}>
                    Delete
                  </Button>
                </td>
               </tr>
                        ))
                    }
						
					</tbody>
				</table>
        
				
		</div>        
    </div>
      
     {/*end of div */} 

     </div>


     {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
            
                autoFocus  value={editName} onChange={(event)=>{setEditName(event.target.value)}}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={editEmail}
               onChange={(event)=>{setEditEmail(event.target.value)}}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveEditData}>
            Update Changes
          </Button>
        </Modal.Footer>
      </Modal>


      </>
);

      
}


export default UserList;