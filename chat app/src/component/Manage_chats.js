import { useState, useEffect }from 'react';
//mport { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
export default function Manage_chats() {
    const [allMessages, setallMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loginUser, setLoginUser] = useState(null);
    const [loginUsername, setLoginUsername] = useState('');

    const navigate = useNavigate();

    //get userchats
    useEffect(() => {
        const storedMessages = localStorage.getItem("user_chats");
        if (storedMessages) {
          // Parse the stored data
          const parsedData = JSON.parse(storedMessages)? JSON.parse(storedMessages): [] ;
          setallMessages(parsedData);
        }
      }, []);

      //get login username

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


      //  get current date and time
      const getCurrentDateTime = () => {
        const currentDateTime = new Date();
        const date = currentDateTime.toLocaleDateString();
        const time = currentDateTime.toLocaleTimeString();
        return `${date} ${time}`;
      };

    const handleUserChatSubmit =(e)=>{
        e.preventDefault();
        if (!newMessage.trim()) {
            alert("pls enter your msg");
            return;
        }
        const newMessageObj = {
            id:uuid(),
            text: newMessage,
            sender: loginUsername, // Assuming user is logged in
            time: getCurrentDateTime(),
            user_id:loginUser[0].id
          };
          allMessages.push(newMessageObj);
          localStorage.setItem('user_chats', JSON.stringify(allMessages));
          // setMessages([...messages, newMessageObj]);
          setNewMessage('');



    }
  return (
    <>
    <div className='container' style={{ border: "1px solid black" }}>
      <div className='container'>
        <h2 style={{ textAlign: "center" }}>Group Chat</h2>
      </div>
      <div className='groupSpace'>
        <div style={{ margin: '20px' }}>
        {allMessages.map(message => (
            <div key={message.id}>
              {message.time}: <strong>{message.sender}: </strong> {message.text}
            </div>
          ))}
        </div>
      </div>
      <div>
        <form onSubmit={handleUserChatSubmit}>
          <div className='row'>
            <div className='col-2' style={{ marginTop: "40px", paddingLeft: "43px" }}>
              {<strong> {loginUsername}:</strong>}
            </div>
            <div className='col-7'>
              <input className="inp" style={{ width: "99%" }} type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message..." />
            </div>
            <div className='col-3' style={{ marginTop: "37px" }}>
            <Button className='btnn'  type="submit" style={{marginRight:"5px ", width:"100px"}} >
                         Send
                    </Button>
                    <Button className='btnn' type="refresh" style={{marginRight:"5px ", width:"100px"}} >
                    Refresh
                    </Button>
              {/* <button className='bbtn' type="submit">Send</button>
              <button className='bbtn' type="refresh">Refresh</button> */}
            </div>
          </div>
        </form>
      </div>
    </div>




</>
  )
}
