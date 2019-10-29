import React from 'react';

import Header from './components/header/header.component';
import Sidebar from './components/sidebar/sidebar.component';

import './App.scss';

function App() {
  return (
    <>
      <Header />
      <div className="grid">
        <Sidebar className="grid-cell" />
      </div>
    </>
  );
}

export default App;
