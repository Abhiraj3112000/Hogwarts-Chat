import React, { Component } from "react";
import Chat from "./Chat";
import { db } from "../firebase/firebase";
import { Form, InputGroup, Button } from "react-bootstrap";

const myStyle = {
  border: "2px solid #5aaaff",
  height: "100px",
  margin: "1rem 20px 20px 20px",
  borderRadius: "10px",
  backgroundColor: "#efefef",
  fontSize: "1.5rem",
  width: "90%",
  fontFamily: "papyrus",
  boxShadow: "5px 5px 5px 0px black",
};
const myStyleButton = {
  margin: "0rem 20px 15px 20px",
  // boxShadow: "5px 5px 5px 0px rgb(158, 155, 155)",
  boxShadow: "5px 5px 5px 0px black",
  fontFamily: "papyrus",
  fontWeight: "bold",
};

const INITIAL_STATE = {
  chat: "",
  newchat: "",
  loaded: false,
  chatLimit: 0,
  error: null,
};
class ChatContainer extends Component {
  state = { ...INITIAL_STATE };

  pageReload() {
    window.location.reload();
  }

  componentDidMount() {
    window.setTimeout(function () {
      window.location.reload();
    }, 60000);
  }

  componentWillMount() {
    db.ref("chats")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.setState({ chat: Object.entries(snapshot.val()).reverse() });
          this.setState({ loaded: true });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  

  onSubmitText = (event) => {
    const { newchat } = this.state;
    if (!newchat?.trim()) {
      this.setState({ newchat: "" });
      alert("Please enter some message");
    } else {
      db.ref("chats")
        .push()
        .set(newchat)
        .then(() => {
          db.ref("chats")
            .get()
            .then((snapshot) => {
              if (snapshot.exists()) {
                this.setState({
                  chat: Object.entries(snapshot.val()).reverse()
                });
                this.setState({ newchat: "" });
                this.setState({ loaded: true });
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
        .catch((e) => {
          alert(e.message);
        });
    }
    event.preventDefault();
  };

  render() {
    const { newchat,loaded } = this.state;
    const invalid = newchat === "";
    return (
      <div style={{ marginBottom: "150px" ,backgroundColor:"#598aba"}}>
        <Form onSubmit={this.onSubmitText}>
          <center>
            <h3 
              style={{
                padding: "100px 0 0 30px",
                textAlign: "center",
                fontFamily: "papyrus",
                fontWeight: "bold",
                color:"pink",
              }}
            >
              Welcome to Hogwarts Chat, the land of anonimity.
              <br />
              Your name changes to a different character from Harry Potter
              everytime you reload the page,
              <br />
              try to get new names, when you are typing or by default every minute but your chat
              remains the same. <br />
              Enjoy chatting :)
            </h3>
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
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={invalid}
            style={myStyleButton}
          >
            Send Message
          </Button>
          <Button
            variant="primary"
            size="lg"
            style={myStyleButton}
            onClick={this.pageReload}
          >
            Get New Names
          </Button>
        </Form>
        <br></br>
        <div className="chat-container">
        { !loaded?
           <h1
           style={{
             marginLeft: "5rem",
             marginBottom: "500px",
             fontFamily: "Comic Sans MS",
           }}
         >Getting New Names...</h1>
        :
            this.state.chat.map((thisChat) => (
              <div>
                <Chat message={thisChat[1]} />
              </div>
            ))
        }
          
        </div>
      </div>
    );
  }
}

export default ChatContainer;
