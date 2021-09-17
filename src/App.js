import React, { useEffect, useState } from 'react';

import './App.scss';
import Head from './component/Head/';
import Foot from './component/Foot/';
import Slide from './component/Slide';
import Base from './component/Base';

const App = () => {
  const [isMobile] = useState(/Mobi/i.test(window.navigator.userAgent));
  useEffect(() => {
    //console.log('App start', isMobile)
  }, []);

  return (
    <div className="App">
      <header className="header">
        header
      </header>
      <main className="main">
        <div className={'contents'}>
          {isMobile ? (
            <div>모바일은 지원하지 않습니다.</div>
          ) : (
            <>
              <Head />
              <Base />
              <Slide />
              <Foot />
            </>
          )}
        </div>
      </main>
      <footer className="footer">
        {isMobile ? '© ROK KF-21 lis, ALL RIGHTS RESERVED' : '© ROK Government KF-21 lis program data, ALL RIGHTS RESERVED'}
      </footer>
    </div>
  );
}

export default App;
