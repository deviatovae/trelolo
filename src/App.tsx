import React from 'react';
import './App.scss';
import Header from './components/view/header/header';
import Footer from './components/view/footer/footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
