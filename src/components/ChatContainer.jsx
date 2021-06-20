import React, { Component } from "react";
import Chat from "./Chat";
import { db } from '../firebase/firebase';
import { Form, InputGroup, Button } from "react-bootstrap";
const myStyle = {
  border: "2px solid #5aaaff",
  height: "100px",
  margin: "1rem 20px 20px 20px",
  borderRadius: "10px",
  backgroundColor: "#efefef",
  fontSize: "1.5rem",
  width:"90%",
  fontFamily: "papyrus",
  boxShadow: "5px 5px 5px 0px rgb(158, 155, 155)"
};
const myStyleButton = {
  margin: "0rem 20px 15px 20px",
  boxShadow: "5px 5px 5px 0px rgb(158, 155, 155)",
  fontFamily: "papyrus",
  fontWeight:"bold"
};

const INITIAL_STATE = {
  chat: "",
  newchat: "",
  loaded: false,
  loadingText: "Loading...",
  error: null
};
class ChatContainer extends Component {
  state = { ...INITIAL_STATE };

  pageReload()
  {
    window.location.reload();
  }
  componentDidMount() {
   this.setState({loadingText:"Changing your names..."})
    window.setTimeout(function () {
      window.location.reload();
    }, 60000);
  }
  
  componentWillMount() {   
    db.ref("chats")
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        this.setState({ chat: Object.entries(snapshot.val()).reverse()});
        this.setState({loaded:true});
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  }
 
  onSubmitText = (event) => {
    const {newchat} = this.state;
          db.ref('chats').push().set(newchat)
          .then(()=> {
            db.ref("chats")
            .get()
            .then((snapshot) => {
              if (snapshot.exists()) {
                this.setState({ chat: Object.entries(snapshot.val()).reverse()});
                this.setState({newchat:""})
                this.setState({loaded:true});
                console.log(Object.entries(snapshot.val()));
              } else {
                console.log("No data available");
              }
            })
            .catch((error) => {
              console.error(error);
            });
          })
          .catch((error) => {
            alert(error.message);
          })
          .catch(e =>{
              alert(e.message);
          });
  
      event.preventDefault();     
  };

  render() {
    const { newchat, loaded, loadingText } = this.state;
    const invalid = newchat==="";
    return (
      <div style={{marginBottom:"150px"}}>
    
        <Form onSubmit={this.onSubmitText}>
          <center>
        <h4 style={{padding:"100px 0 0 30px",textAlign:"center",fontFamily: "papyrus", fontWeight:"bold"}}>Welcome to Hogwarts Chat, the land of anonimity.<br/>
         Your name changes to a different character from Harry Potter everytime you reload the page,<br/>
          try to get new chats or by default every minute but your chat remains the same. <br/>
          Enjoy chatting :)</h4>
          </center>
            <InputGroup>
              <Form.Control
                type="textarea"
                style={myStyle}
                value={newchat}
                placeholder="Enter message here"
                onChange={(event) =>
                  this.setState({ newchat: event.target.value })
                }
              />
            </InputGroup>
            <br />
            <Button type="submit" variant="primary" size="lg" disabled={invalid} style={myStyleButton} >Send Message</Button>
            <Button variant="primary" size="lg" style={myStyleButton} onClick={this.pageReload}>Get New Names</Button>
          </Form>
          <br></br>
        <div className="chat-container">
          {
          loaded === true && this.state.chat === "" ? (
            <h1 style={{marginLeft:"5rem",marginBottom:"500px", fontFamily: "Comic Sans MS"}}>No chat present</h1>
          ) :!loaded? <h1 style={{marginLeft:"5rem",marginBottom:"500px", fontFamily: "Comic Sans MS"}}>{loadingText}</h1>: (
            this.state.chat.map((thisChat) => (
              <div>
                <Chat message={thisChat[1]} />
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default ChatContainer;
