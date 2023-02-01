import React from 'react';
import './App.scss';
import Header from './pages/header';
import Footer from './pages/footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App wrapper">
      <Header />


      <div className="temporal-div">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br/><br/>
      </div>
      
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
