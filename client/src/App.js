import React,{useState} from 'react'
import './App.css';
import Container from './components/pages/mainPage/container';
import {
  HashRouter as Router,
} from 'react-router-dom'
import { DataProvider } from './components/features/globalState/GlobalState'
const isTokenExpierd = ()=>{

}
function App() {
  const [isToken, setisToken] = useState()
  setTimeout(() => {
    // alert("you'r not logged please login")
  }, 5000);
  return (
    <div className="App">
      <DataProvider>
        <div className="App">
          <Router>
            <Container />
          </Router>
        </div>
      </DataProvider>
    </div>
  );
}

export default App;
