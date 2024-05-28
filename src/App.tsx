import React from 'react';
import logo from './logo.svg';
import './App.css';
import LayoutComponent from './components/LayoutComponent/LayoutComponent';
import LoginModal from './modals/login';

const App: React.FC = () => {

  return (
    <>
      <LoginModal onClick={() => {}} password="" username="" email="" />
      
      <LayoutComponent />
    </>
  );
}

export default App;
