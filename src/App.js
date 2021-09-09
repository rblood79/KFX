import React, { useState, useEffect, } from 'react';

import './App.scss';
import Head from './component/Head/';
import Foot from './component/Foot/';
import Slide from './component/Slide';

const App = () => {
  const [topNum, setTopNum] = useState(1);
  const [type, setType] = useState('list');
  const [data, setData] = useState([]);
  const [focused, setFocused] = useState(null);
  //
  const [topNav] = useState([
    { id: 0, title: 'GWANGJU 1B', },
    { id: 1, title: 'DAEGU 2B', },
    { id: 2, title: 'BUSAN 3B', },
  ]);
  //
  const daegu = [
    { id: 11, title: 'KF-21-001', img: 'aircraft/air-0.png', engine: 94, 주기검사: 80, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 77 },
    { id: 12, title: 'KF-21-002', img: 'aircraft/air-1.png', engine: 88, 주기검사: 75, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 79 },
    { id: 13, title: 'KF-21-003', img: 'aircraft/air-2.png', engine: 82, 주기검사: 80, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 71 },
    { id: 14, title: 'KF-21-004', img: 'aircraft/kf-21.png', engine: 79, 주기검사: 77, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 65 },
    { id: 15, title: 'KF-21-005', img: 'aircraft/air-4.png', engine: 71, 주기검사: 55, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 88 },
    { id: 16, title: 'KF-21-006', img: 'aircraft/air-5.png', engine: 65, 주기검사: 89, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 82 },
    { id: 17, title: 'KF-21-007', img: 'aircraft/air-3.png', engine: 59, 주기검사: 80, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 47 },
    { id: 18, title: 'KF-21-008', img: 'aircraft/kf-21.png', engine: 43, 주기검사: 30, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 76 },
    { id: 19, title: 'KF-21-009', img: 'aircraft/air-2.png', engine: 36, 주기검사: 54, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 23 },
  ]

  const shuffleList = () => {
    console.log('callBackSort');
  }

  useEffect(() => {
    console.log('useEffect app');
    //setData(daegu);
    if(topNum === 1){
      setData(daegu);
    }else{
      setData([]);
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
