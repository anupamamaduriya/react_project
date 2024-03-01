import { useState, useEffect }  from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function ManageDocument() {
     
    const [fileLable, setFileLabel] = useState('');
    const [filename, setFilename] = useState('');
    const [loginUser, setLoginUser] = useState(null);
    const [loginUsername, setLoginUsername] = useState('');
    const [storeDocument, setstoreDocument] = useState([]);
    const [show, setShow] = useState(false);
    const [showEditModel, setshowEditModel] = useState(false);
    const [editedDocument, seteditedDocument] = useState([]);
//   const [editName, setEditName] = useState('');  
//     const [editEmail, setEditEmail] = useState('');
//     const [editIndex, setEditIndex] = useState('');
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleEditClose = () => setshowEditModel(false);


    useEffect(() => {
        const storedLoginData = localStorage.getItem('LoginUser');
        if (storedLoginData) {
          const parsedData = JSON.parse(storedLoginData);
          setLoginUser(parsedData);
          setLoginUsername(parsedData[0].name);
        //  console.log(loginUser);
        }else{
            navigate("/login");
        }
      }, []);

      useEffect(() => {
        const storedMessages = localStorage.getItem("user_document");
        if (storedMessages) {
          // Parse the stored data
          const parsedData = JSON.parse(storedMessages)? JSON.parse(storedMessages): [] ;
          setstoreDocument(parsedData);
        }
      }, []);


    const  handleChange =(event) =>{
             setFilename(event.target.files[0]);
        //console.log(file.name);
      }

    const handleShow = () => {
        setShow(true);
      }
     
      const getCurrentDateTime = () => {
        const currentDateTime = new Date();
        const date = currentDateTime.toLocaleDateString();
        const time = currentDateTime.toLocaleTimeString();
        return `${date} ${time}`;
      };
      const saveDocument=()=>{
        // if (!newMessage.trim()) {
        //     alert("pls enter your msg");
        //     return;
        // }
        const newMessageObj = {
            id:uuid(),
            file_label: fileLable,
            file_name: filename.name,
            upload_by: loginUsername,
            upload_user_id:loginUser[0].id, // Assuming user is logged in
            time: getCurrentDateTime(), 
          };
          storeDocument.push(newMessageObj);
          localStorage.setItem('user_document', JSON.stringify(storeDocument));
          alert('document upload successfully');
          setShow(false);
      }

      const deleteDocument =(id)=>{ 
        const confirmBox = window.confirm(
          "Do you really want to delete this Document?"
        );
      if (confirmBox == true) {
            const newdata=  storeDocument.filter((arrElement,index)=>{
                    return  arrElement.id !==id;
            });
            localStorage.setItem('user_document', JSON.stringify(newdata));
            setstoreDocument(newdata);  
      }
        
    }


    const editDocument = (id)=>{
           console.log(id);
        const editDocumentData = storeDocument.find((curElem) => {
            if(curElem.id === id){
              return curElem;
            };
          });

          seteditedDocument(editDocumentData);
          setFileLabel(editDocumentData.file_label);
          setshowEditModel(true);
    }

    const saveEditData = (id) =>{
                  console.log(id);
                  seteditedDocument([]);
         const findDocument = storeDocument.find( (selectItem) => selectItem.id == id); 
         const updatedData = { ...findDocument,file_label: fileLable };

         const newdata=  storeDocument.filter((arrElement,index)=>{
              return  arrElement.id !==id;
         });

         newdata.push(updatedData);

         localStorage.setItem('user_document', JSON.stringify(newdata));

              setstoreDocument(newdata);  
              console.log(newdata);
                      
      
                  setshowEditModel(false);
      
      }


  return (

    <>
    <div className="container"> 
        <div className="table-responsive">
            <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                            <span> My Uploads</span>
                                
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    
                    <th  style={{width:"30%"}}>Name</th>
                    <th style={{width:"30%"}}>Email</th>
                    <th style={{width:"40%"}}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                           
                      {  storeDocument.map((item, index) => (
                                <tr key={item.id}>
                                
                                    <td style={{width:"30%"}}> {item.file_label}</td>
                                    <td style={{width:"30%"}}>{item.file_name}</td>   
                                    <td style={{width:"40%"}}> 
                                    <Button className='btnn' style={{marginRight:"5px ", width:"100px"}} onClick={()=>editDocument(item.id)}>
                                            Edit
                                        </Button>
                                        <Button className='btnn' style={{marginRight:"5px", width:"100px"}} onClick={()=>deleteDocument(item.id)}>
                                            Delete
                                        </Button>
                                        <Button className='btnn' style={{marginRight:"5px", width:"100px"}} >
                                            Share
                                        </Button>
                                
                                
                                </td>
                                </tr>
                                 ))
                            } 
                                
                        </tbody>
                    </table>
                </div>  

                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <span> Shared Documents</span>   
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                         <tr>            
                            <th  style={{width:"30%"}}>Name</th>
                            <th style={{width:"30%"}}>Email</th>
                            <th style={{width:"40%"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {    
                        userData.map((item, index) => ( */}
                    <tr>
                        <td style={{width:"30%"}}></td>
                        <td style={{width:"30%"}}></td>   
                        <td style={{width:"40%"}}> 
                            <Button className='btnn' style={{marginRight:"5px ", width:"100px"}} >
                                Edit
                            </Button>
                            <Button className='btnn' style={{marginRight:"5px", width:"100px"}} >
                                Delete
                            </Button>
                            <Button className='btnn' style={{marginRight:"5px", width:"100px"}} >
                                Share
                            </Button>
                        </td>
                    </tr>
                                {/* ))
                            } */}
                                <tr><td colSpan="3"><Button className='btnn' style={{marginRight:"5px", width:"100px"}} 
                                 onClick={()=>handleShow()} >
                                Add Uploads
                            </Button> </td></tr>
                        </tbody>
                    </table>
                </div>       
           </div>
  
 {/*end of div */} 

 </div>


<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
  <Modal.Title>Upload</Modal.Title>
</Modal.Header>
<Modal.Body>
  <Form>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>File Description</Form.Label>
      <Form.Control
        type="text"
            autoFocus 
            onChange={(event)=>setFileLabel(event.target.value)}/>
    </Form.Group>
    <Form.Group
      className="mb-3"
      controlId="exampleForm.ControlTextarea1"
    >
      <Form.Label>Upload File </Form.Label>
      <Form.Control type="file" onChange={handleChange}/>
    </Form.Group>
  </Form>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Close
  </Button>
  <Button variant="primary"    onClick={saveDocument}>
    Save Changes
  </Button>
</Modal.Footer>
</Modal>







<Modal show={showEditModel} onHide={handleEditClose}>
<Modal.Header closeButton>
  <Modal.Title>Edit Document</Modal.Title>
</Modal.Header>
<Modal.Body>
  <Form>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>File Description</Form.Label>
      <Form.Control
        type="text"
            autoFocus  value={fileLable}
            onChange={(event)=>setFileLabel(event.target.value)}/>
    </Form.Group>

  </Form>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleEditClose}>
    Close
  </Button>
  <Button variant="primary" onClick={()=>saveEditData(editedDocument.id)}>
    Update Changes
  </Button>
</Modal.Footer>
</Modal>

</>
  )
}
