import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './App.scss';
import Head from './component/Head/';
import Foot from './component/Foot/';
import Slide from './component/Slide';
import Base from './component/Base';
import Loading from './component/Loading';

const App = () => {
  console.log('App')
  const [isMobile] = useState(/Mobi/i.test(window.navigator.userAgent));
  const [top, setTop] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const onLoad = () => {
    fetch('https://rblood79.github.io/data/dataset.js', {
      headers: {
        'Accept': 'application / json'
      }
    })
      .then(response => response.json()) // => JSON body 를 JS로 변환
      .then(response => setData(response));
  }

  useEffect(() => {
    let resultTop = [];
    _.forEach(data, function (n, key) {
      resultTop.push(n.부대)
    });
    setTop(resultTop);
  }, [data]);

  useEffect(() => {
    onLoad()
  }, []);

  return (
    <div className="App">
      <header className="header" />
      <main className="main">
        <div className={'contents'}>
          {isMobile ? (
            <div>모바일은 지원하지 않습니다.</div>
          ) : (
            loading ? (
              <Loading callBack={setLoading} />
            ) : (
              <>
                <Head data={top} />
                <Base />
                <Slide data={data} />
                <Foot />
              </>
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
