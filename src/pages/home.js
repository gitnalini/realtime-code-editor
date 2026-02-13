import React from 'react';
import {v4 as uuidV4} from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home =() => {
    const navigate=useNavigate();
    const [roomID, setRoomID] = React.useState('');
    const [username, setUsername] = React.useState('');
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomID(id);
        toast.success('Created a new Room');
    };
    const joinRoom =() =>{
        if(!roomID || !username){
            toast.error('ROOM ID & username is required');
            return; 
    }
    // Redirecting to editor page
    navigate(`/editor/${roomID}`, {state: {
        username,           
    }});
    };
    const HandleInputEnter = (e) => {
          console.log('event',e.code);
          if(e.code=='Enter'){
            joinRoom();
          }
    }
    return (
          <div className="pageContainer">
        <div className="homePageWrapper">
            <div className="formWrapper">
               <img  className= "homePageLogo" src="/code-sync.png" alt="code-sync-logo"  />
               <h4 className="mainLabel">Paste invitation room ID</h4>
                <div className="inputGroup"> 
                    <input 
                        type="text" 
                        className="inputBox" 
                        placeholder="Room ID" 
                        onChange={(e) => setRoomID(e.target.value)}
                        value={roomID}
                        onKeyUp={HandleInputEnter}  
                    />

                    <input 
                        type="text" 
                        className="inputBox" 
                        placeholder="User Name" 
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        onKeyUp={HandleInputEnter}
                    />

                    <button className="btn joinBtn" onClick={joinRoom}>Join</button>
                </div>
                  <span className="createInfo">
          If you don't have an invite then create&nbsp;
          <a href="#" onClick={createNewRoom} className="createNewBtn">
            new room
          </a>
        </span>
            </div>
        </div>  
       <footer className="footer">
            <h4>Built with 💖</h4> 
        {/* add github link later */}
       </footer>
</div>         
        
    )
};

export default Home;