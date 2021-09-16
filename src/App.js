import React, { useEffect, } from 'react';

import './App.scss';
import Head from './component/Head/';
import Foot from './component/Foot/';
import Slide from './component/Slide';
import Base from './component/Base';

const App = () => {
  useEffect(() => {
    console.log('App start')
  }, []);

  return (
    <div className="App">
      <header className="header">
        header
      </header>
      <main className="main">
        <div className={'contents'}>
          <Head />
          <Base />
          <Slide />
          <Foot />
        </div>
      </main>
      <footer className="footer">
        © 2023 ROK Government kf-21 lis program data, ALL RIGHTS RESERVED
      </footer>
    </div>
  );
}

export default App;
