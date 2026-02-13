import React from "react";
import Avatar from "react-avatar";

const Client = ({username}) => {
    return (
        <div className="client"> 
        <Avatar name={username} round="14px" size="50" />
        <span className="userName">{username}</span>        
            
           
            </div>      
    );
};
export default Client;