import React, { useState, useEffect, } from 'react';

import './App.scss';
import {shuffle} from './component/Utill';
import Head from './component/Head/';
import Foot from './component/Foot/';
import Slide from './component/Slide';

import {gwangju, daegu, busan} from './component/Data'

const App = () => {
  const [topNum, setTopNum] = useState(0);
  const [type, setType] = useState('list');
  const [data, setData] = useState([]);
  const [focused, ] = useState(null);
  //
  const [topNav] = useState([
    { id: 0, title: 'GWANGJU 1B', },
    { id: 1, title: 'DAEGU 2B', },
    { id: 2, title: 'BUSAN 3B', },
  ]);
  //
  const shuffleList = () => {
    setData(shuffle(data));
  }

  useEffect(() => {
    console.log('useEffect app');
    //setData(daegu);
    if(topNum === 0){
      setData(gwangju);
    }else if(topNum === 1){
      setData(daegu);
    }else if(topNum === 2){
      setData(busan);
    }
  },[topNum]);

  return (
    <div className="App">
      <header className="header">
        header
      </header>
      <main className="main">
        <div className={'contents'}>
          <Head
            topNav={topNav} topNum={topNum} callBack={setTopNum}
            type={type} callBackType={setType}
            callBackSort={shuffleList}
          />
          <Slide type={type} data={data} focused={focused}/>
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
