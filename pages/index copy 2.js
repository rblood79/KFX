import Head from 'next/head'
import Image from 'next/image'
import classNames from 'classnames';
import styles from '../styles/Home.module.scss'
import { FindColor } from './component/Utill';
import React, { useContext, useState, useEffect, useRef, createContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Flipper, Flipped } from 'react-flip-toolkit'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  dynamicBullets,
  EffectCreative,
} from "swiper";

SwiperCore.use([Pagination, EffectCreative]);

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/effect-coverflow"

const App = props => {
  const [data, setData] = useState([]);
  const [topNum, setTopNum] = useState(1);
  const [stepNum, setStepNum] = useState(1);
  const [rowNum, setRowNum] = useState(1);
  const [topNav] = useState([
    { title: 'GWANGJU #1B', },
    { title: 'DAEGU #2B', },
    { title: 'BUSAN #3B', },
  ])
  const [stepData] = useState([
    { title: 'STEP 1', comment: 'Condition' },
    { title: 'STEP 2', comment: 'Aircraft' },
    { title: 'STEP 3', comment: 'Confirm' },
    { title: 'STEP 4', comment: 'Other' }
  ])
  const onLoad = async () => {
    let temp = [
      { id: 1, key: 1, title: 'KF-21-001', engine: '94', dataA: 'aaaa', dataB: 'bbbb', dataA: 'aaaa', dataC: 'bbbb', dataD: 'aaaa', dataE: 'bbbb', dataF: 'aaaa', dataG: 'bbbb' },
      { id: 2, key: 2, title: 'KF-21-002', engine: '88', dataA: 'aaaa', dataB: 'bbbb', dataA: 'aaaa', dataC: 'bbbb', dataD: 'aaaa', dataE: 'bbbb', dataF: 'aaaa', dataG: 'bbbb' },
      { id: 3, key: 3, title: 'KF-21-003', engine: '82', dataA: 'aaaa', dataB: 'bbbb', dataA: 'aaaa', dataC: 'bbbb', dataD: 'aaaa', dataE: 'bbbb', dataF: 'aaaa', dataG: 'bbbb' },
      { id: 4, key: 4, title: 'KF-21-004', engine: '79', dataA: 'aaaa', dataB: 'bbbb', dataA: 'aaaa', dataC: 'bbbb', dataD: 'aaaa', dataE: 'bbbb', dataF: 'aaaa', dataG: 'bbbb' },
      { id: 5, title: 'KF-21-005', engine: '71', dataA: 'aaaa', dataB: 'bbbb', dataA: 'aaaa', dataC: 'bbbb', dataD: 'aaaa', dataE: 'bbbb', dataF: 'aaaa', dataG: 'bbbb' },
      { id: 6, title: 'KF-21-006', engine: '65', dataA: 'aaaa', dataB: 'bbbb', dataA: 'aaaa', dataC: 'bbbb', dataD: 'aaaa', dataE: 'bbbb', dataF: 'aaaa', dataG: 'bbbb' },
      { id: 7, title: 'KF-21-007', engine: '59', dataA: 'aaaa', dataB: 'bbbb', dataA: 'aaaa', dataC: 'bbbb', dataD: 'aaaa', dataE: 'bbbb', dataF: 'aaaa', dataG: 'bbbb' },
      { id: 8, title: 'KF-21-008', engine: '43', dataA: 'aaaa', dataB: 'bbbb', dataA: 'aaaa', dataC: 'bbbb', dataD: 'aaaa', dataE: 'bbbb', dataF: 'aaaa', dataG: 'bbbb' },
      { id: 9, title: 'KF-21-009', engine: '36', dataA: 'aaaa', dataB: 'bbbb', dataA: 'aaaa', dataC: 'bbbb', dataD: 'aaaa', dataE: 'bbbb', dataF: 'aaaa', dataG: 'bbbb' },
      { id: 10, title: 'KF-21-013', engine: '25', dataA: 'aaaa', dataB: 'bbbb', dataA: 'aaaa', dataC: 'bbbb', dataD: 'aaaa', dataE: 'bbbb', dataF: 'aaaa', dataG: 'bbbb' },
      { id: 11, title: 'KF-21-0143', engine: '19', dataA: 'aaaa', dataB: 'bbbb', dataA: 'aaaa', dataC: 'bbbb', dataD: 'aaaa', dataE: 'bbbb', dataF: 'aaaa', dataG: 'bbbb' },
    ]
    setData(temp)
  }
  const gueaguBox = () => {
    const result = [];
    for (let i = 0; i < 10; i++) {
      result.push(<span key={i} className={styles.gueaguBox} />)
    }
    return result;
  }
  const boxLine = () => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      result.push(<span key={i} className={styles.boxLine} />)
    }
    return result;
  }
  const ListItem = (item) => {
    //console.log(item)
    let percentColor = FindColor(item.engine, 0, 240);
    return (
      <>
        <div className={styles.aircraftGroup}>
          <div className={styles.aircraft}>
            <img src={'kf-21.png'} />
          </div>
        </div>
        <div className={styles.boxLineGroup}>
          {boxLine()}
        </div>
        <div className={styles.itemGueage}>
          <div className={styles.itemBar} style={{ width: item.engine + '%', backgroundColor: percentColor }} />
          {gueaguBox()}
        </div>
        <div className={styles.itemTitle}>{item.title}</div>
        <div className={styles.itemPercent} style={{ color: percentColor }}>{item.engine}%</div>
      </>
    )
  }
  const shuffleList = () => setData(mix());

  const mix = () => {
    const array = data.slice();
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    onLoad();
    console.log('useEffect', data.length);

  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>KF-21 Aircraft</title>
        <meta name="description" content="KF-21" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;200;300;400;500;700&display=swap" rel="stylesheet"></link>
      </Head>
      <nav className={styles.nav}>
        <button className={styles.navButton}>A</button>
        <button className={styles.navButton}>B</button>
        <button className={styles.navButton}>V</button>
        <button onClick={shuffleList}>Mix it up!</button>
      </nav>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.topLogo}><div className={styles.logoBase}></div><div className={styles.logo} /></div>
            <div className={styles.topNav}>
              {
                topNav.map((item, idx) => {
                  return (
                    <button key={idx} className={classNames(styles.topButton, idx === topNum ? styles.active : null)}>{item.title}</button>
                  )
                })
              }
            </div>
            <div className={styles.topView}>
              <button className={styles.viewButton}>L</button>
              <button className={styles.viewButton}>G</button>
              <button className={styles.viewButton}>S</button>
            </div>
          </div>
          <div className={styles.swiperContainer}>
            <Flipper flipKey={data}>
              <Swiper
                className={styles.swiper}
                spaceBetween={48}
                slidesPerView={4}
                grid={{
                  "rows": rowNum
                }}
                //centeredSlides={true}
                grabCursor={true}
                pagination={{
                  clickable: true,
                  //"dynamicBullets": true
                }}
                navigation
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {
                  data.map((item, idx) => {
                    let percentColor = FindColor(item.engine, 0, 240);
                    return (
                      <SwiperSlide key={idx} className={styles.swiperSlide}>
                        <Flipped flipId={item.id} key={item.id} >
                          <ListItem key={idx} {...item} className={styles.swiperItem} />
                        </Flipped>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </Flipper>
          </div>
          <div className={styles.step}>
            <ul className={styles.stepGroup}>
              {
                stepData.map((item, idx) => {
                  return (
                    <li key={idx} className={classNames(styles.stepItem, idx === stepNum ? styles.active : null)}>
                      <span className={styles.stepItemTitle}>{item.title}</span>
                      <span className={styles.stepItemComment}>{item.comment}</span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        Copyrights 2022 ROK Government kf-21 lis program data, ALL RIGHTS RESERVED
      </footer>
    </div >
  )
}
export default App;