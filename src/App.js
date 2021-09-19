import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './App.scss';
import Head from './component/Head/';
import Foot from './component/Foot/';
import Slide from './component/Slide';
import Base from './component/Base';

import { DS } from './component/Data';

const App = () => {
  console.log('App')
  const [isMobile] = useState(/Mobi/i.test(window.navigator.userAgent));
  const [top, setTop] = useState(null);
  const [data, setData] = useState(null);

  const dataLoad = () => {
    setData(DS)
  }
  useEffect(() => {
    //
    if (DS) {
      let resultTop = [];
      _.forEach(data, function (n, key) {
        resultTop.push(n.부대)
      });
      setTop(resultTop);
    }
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
            data ? (
              <>
                <Head data={top} />
                <Base />
                <Slide data={data} />
                <Foot />
              </>
            ) : (
              <div className='loading'>
                <button className={'callButton'} onClick={() => { dataLoad() }}>
                  <span className='callButtonText'>Load</span>
                </button>
              </div>
            )
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
