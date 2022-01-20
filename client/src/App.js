import React,{useState} from 'react'
import './App.css';
import Container from './components/pages/mainPage/container';
import {
  HashRouter as Router,
} from 'react-router-dom'
import { DataProvider } from './components/features/globalState/GlobalState'

function App() {
  return (
    <div >
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
