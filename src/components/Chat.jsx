import React from 'react'
import names from '../functions/getnames'
const Chat = (props) => {
    let boxStyle={
        padding:"0rem 3rem 3rem 3rem", 
        border:"2px  black", 
        width:"90%",
        height:"200px",
        overflowY:"scroll", 
        margin: "20px 30px 20px 20px",
        borderRadius:"10px",
        backgroundColor:"silver",
        fontFamily: "papyrus",
        boxShadow: "5px 5px 5px 0px black"
    }

    return (
        <div>
             <left>
                <div className="chat-container" style={boxStyle}>
                    <br/>
                    <h4><strong>{names[Math.floor(Math.random() *(names.length-1))]}</strong></h4>
                    <br/>
                    <p className="chat-message" style={{fontSize:"1.5rem"}}>{props.message}</p>
                </div>
            </left>
        </div>
    )
}

export default Chat
