import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import './App.scss';
import Head from './component/Head/';
import Foot from './component/Foot/';
import Slide from './component/Slide';
import Base from './component/Base';
import Loading from './component/Loading';

import Mobile from './component/Mobile';

const App = () => {
  //console.log('App')
  const [props] = useState(window['getProps']());
  const [isMobile] = useState(/Mobi/i.test(window.navigator.userAgent));
  const [top, setTop] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onLoad = async () => {
      fetch(props.url, {
        headers: {
          'Accept': 'application / json'
        }
      })
        .then(response => response.json())
        .then(response => setData(response));
    }
    const ini = () => {
      let resultTop = [];
      _.forEach(data, function (n) {
        resultTop.push(n.부대)
      });
      setTop(resultTop);
    }
    !data ? onLoad() : ini();
  }, [data, props.url]);

  return (
    <div className="App">
      <header className="header" />
      <main className="main">
        <div className={classNames('contents', loading && 'loading')}>
          {isMobile ? (
            <Mobile />
          ) : (
            <>
              <Base loading={loading} />
              <Head data={top} />
              {
                loading ? <Loading callBack={setLoading} {...props} /> : <Slide data={data} />
              }
              <Foot stepNum={loading ? 0 : 1} />
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
