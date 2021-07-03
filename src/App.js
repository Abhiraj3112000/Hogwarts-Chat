import React from 'react'
import ChatContainer from './components/ChatContainer.jsx'
import Nav from './components/Nav.jsx'
import './App.css'
import Footer from './components/Footer.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import Skeleton from './components/SkeletonLoader.jsx'
const loaded = false;
class App extends React.Component {
  state = {loaded};

  componentDidMount() {    
        setTimeout(() => this.setState({loaded: true}));    
  }
  render(){
  return (
    !this.state.loaded?
    <div style={{marginTop:"10%", marginLeft:"15%"}}>
    <Skeleton/>
    </div>
     :
     <div className="app">
       <Nav/>
       <div className="container">
         <ChatContainer/>
       </div>
       <Footer/>
    </div>
  )
}
}

export default App
