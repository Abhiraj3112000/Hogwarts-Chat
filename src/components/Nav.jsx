import React from 'react'

const Nav = () => {
    return (
        <div style ={  {
        borderBottom: '1px solid', 
        width:"100%", 
        zIndex:"1000",
        textAlign:"center",
        position:"fixed",
        fontSize:"30px",
        color:"#007bff",
        backgroundColor:"#bdbdbd",
        fontFamily:"Comic Sans MS",
        padding: "5px"}}>
   
            <img 
                      style={{height:"30px", width:"30px"}}
            src="witch_hat.png" alt="witch_hat"/>
           &nbsp; Hogwarts Chat
        </div>
    )
}

export default Nav
