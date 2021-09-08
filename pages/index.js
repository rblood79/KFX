import Head from 'next/head'
import Image from 'next/image'
import classNames from 'classnames';
import styles from '../styles/Home.module.scss'
import ReactDOM from "react-dom";
import _ from 'lodash';
import { FindColor, byKeys } from '../component/Utill';
import React, { useContext, useState, useEffect, useRef, forwardRef, createContext } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Mousewheel,
  Keyboard,
  A11y,
  dynamicBullets,
  EffectCreative,
} from "swiper";

import Step from '../component/Step';

SwiperCore.use([Pagination, Scrollbar, Mousewheel, Keyboard]);

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
//import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/effect-coverflow"

import 'remixicon/fonts/remixicon.css'

const App = props => {
  //const scanner = React.useRef(null);
  const [topNum, setTopNum] = useState(1);
  const [stepNum, setStepNum] = useState(1);
  const [rowNum, setRowNum] = useState(1);
  const [swiper, setSwiper] = useState(null);
  const [slideSize, setSlideSize] = useState(0);
  const [over, setOver] = useState(false);
  const [spring, setSpring] = useState('noWobble');
  const [type, setType] = useState('list');
  const [focused, setFocused] = useState(null);
  const [data, setData] = useState([]);

  const [topNav] = useState([
    { title: 'GWANGJU 1B', },
    { title: 'DAEGU 2B', },
    { title: 'BUSAN 3B', },
  ])

  const [itemIcon] = useState([
    { name: '주기검사', icon: 'ri-tools-fill' },
    { name: '야간비행', icon: 'ri-contrast-2-fill' },
    { name: '외장변경', icon: 'ri-timer-line' },
    { name: '실무장여부', icon: 'ri-flight-takeoff-fill' },
    { name: '항공기등급', icon: 'ri-todo-line' },
    { name: '조종사컨디션', icon: 'ri-user-heart-line' },
    { name: '비행일수', icon: 'ri-calendar-line' },
    { name: '주요결함', icon: 'ri-pulse-line' },
  ])

  const gwangju = [
    { id: 1, title: 'F-16-001', img: 'aircraft/air-0.png', engine: 15, 주기검사: 66, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 80 },
    { id: 2, title: 'F-16-002', img: 'aircraft/air-1.png', engine: 76, 주기검사: 78, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 44 },
    { id: 3, title: 'F-16-003', img: 'aircraft/air-2.png', engine: 51, 주기검사: 44, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 67 },
    { id: 4, title: 'KF-21-013', img: 'aircraft/air-3.png', engine: 25, 주기검사: 52, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 24 },
    { id: 5, title: 'KF-21-0143', img: 'aircraft/air-4.png', engine: 19, 주기검사: 30, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 55 },
  ]

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

  const busan = [
    { id: 21, title: 'T-50-001', img: 'aircraft/air-0.png', engine: 55, 주기검사: 75, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 99 },
    { id: 22, title: 'T-50-002', img: 'aircraft/air-5.png', engine: 89, 주기검사: 99, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 88 },
    { id: 23, title: 'T-50-003', img: 'aircraft/kf-21.png', engine: 77, 주기검사: 47, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 14 },
    { id: 24, title: 'T-50-004', img: 'aircraft/air-2.png', engine: 18, 주기검사: 55, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 56 },
    { id: 25, title: 'T-50-005', img: 'aircraft/air-3.png', engine: 24, 주기검사: 42, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 47 },
    { id: 26, title: 'T-50-006', img: 'aircraft/air-4.png', engine: 9, 주기검사: 18, 야간비행: 50, 외장변경: 50, 실무장여부: 50, 항공기등급: 50, 조종사컨디션: 50, 비행일수: 50, 주요결함: 26 },
  ]

  const shuffleList = () => setData(mix(data));

  const mix = (dataSet) => {
    const array = dataSet.slice();
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

  const sortUpper = (dataSet) => {
    let array = dataSet.slice();
    array = array.sort(function (a, b) {
      return b.engine - a.engine;
    });
    return array;
  }

  const gueaguBox = () => {
    const result = [];
    for (let i = 0; i < 10; i++) {
      result.push(<span key={i} className={styles.gueaguBox} />)
    }
    return result;
  }
  const boxLine = (item) => {
    const result = [];
    result.push(<span key={'base' + item.id} className={classNames(styles.boxLineBase, 'boxLineBase')} />)

    if (!focused) {
      for (let i = 0; i < 4; i++) {
        result.push(<span key={i} className={classNames(styles.boxLine, 'boxLine')} />)
      }
    }

    if (type !== 'grid' || focused) {
      result.push(
        <div key={'button' + item.id} className={classNames(styles.detailButton, 'detailButton')} onClick={(e) => itemClick(e, item.id)}>
          <span className={styles.detailText}>{focused ? 'CLOSE' : 'DETAIL'}</span>
        </div>
      )
    }
    return result;
  }

  const ListItem = (item, onClick) => {
    //console.log('//', item)
    let percentColor = FindColor(item.engine, 0, 240);
    return (
      <Flipped flipId={item.id} translate>
        <div key={item.id} className={classNames(styles.listItem, 'listItem', item.active ? styles.active : null)} onClick={(e) => type === 'grid' && itemClick(e, item.id)}>
          <div className={classNames(styles.boxLineGroup, 'boxLineGroup')}>
            {
              boxLine(item)
            }
          </div>
          <div className={styles.aircraftGroup}>
            <div className={styles.aircraft}>
              <img src={item.img} />
            </div>
          </div>

          <div className={classNames(styles.itemSwitch, 'itemSwitch')}>
            <div className={styles.itemTitle}>{item.title}</div>
            <div className={styles.itemGueage}>
              <div className={styles.itemBar} style={{ width: item.engine + '%', backgroundColor: percentColor }} />
              {gueaguBox()}
            </div>
            <div className={classNames(styles.itemPercent, 'itemPercent')} style={{ color: percentColor }}>{item.engine}%</div>
          </div>

          <div className={classNames(styles.itemSwitchActive, 'itemSwitchActive')}>
            <div>
              <div className={styles.itemGueage}>
                <div className={styles.itemBar} style={{ width: item.engine + '%', backgroundColor: percentColor }} />
                {gueaguBox()}
              </div>
              <span className={styles.itemRating}>RATING POINT</span>
              <div className={classNames(styles.itemPercent, 'itemPercent')} style={{ color: percentColor }}>{item.engine}%</div>
            </div>
            <div className={styles.itemTitleGroup}>
              <div className={styles.itemTitle}>{item.title}</div>
              <span className={styles.itemSubText}>Boramae</span>
            </div>
          </div>
        </div>
      </Flipped>
    )
  }

  const ListItemExpend = (item, onClick) => {
    //console.log('//000', item)
    let percentColor = FindColor(item.engine, 0, 240);
    return (
      <Flipped flipId={item.id} key={item.id} translate>
        <div key={item.id} className={classNames(styles.listItem, styles.listItemExpend, item.active ? styles.active : null)} >
          <div className={classNames(styles.boxLineGroup, 'boxLineGroup')}>
            {
              boxLine(item)
            }
          </div>
          <div className={styles.graph}>
            <img src={'gr.png'} />
          </div>
          <div className={styles.itemTitle}>{item.title}<span className={styles.itemTitleGray}>BORAMAE</span></div>
          <span className={styles.itemPoint}>MATCHING POINT</span>
          <div className={classNames(styles.itemPercent, 'itemPercent')} style={{ color: percentColor }}>{item.engine}%</div>
        </div>
      </Flipped>
    )
  }



  const SideItem = item => {
    //console.log('sideItem', item)
    const rr = byKeys(item, ['주기검사', '야간비행', '외장변경', '실무장여부', '항공기등급', '조종사컨디션', '비행일수', '주요결함'])
    const result = [];
    _.map(rr, (val, key) => {
      result.push(
        <li key={key} className={styles.sideItem}>
          <span className={styles.sideItemBase} />
          <span className={styles.sideItemIcon}><i className={_.find(itemIcon, ['name', key]).icon}></i></span>
          <span className={styles.sideItemTitle}>{key}</span>
          <span className={styles.sideItemValue}>{key === '야간비행' ? <i className={'ri-check-fill'} /> : val}</span>
        </li>
      )
    })
    return result;
  }

  const viewType = (type) => {
    if (type === 'list') {
      setType('list');
      swiper.params.spaceBetween = 96;
      //swiper.params.slidesPerView = 4;
      swiper.params.centeredSlides = true;
      swiper.slideTo(0);
      swiper.enable();
    } else {
      setType('grid');
      swiper.params.spaceBetween = 0;
      //swiper.params.slidesPerView = 4;
      swiper.params.centeredSlides = false;
      swiper.pagination = false;
      swiper.slideTo(0);
      swiper.disable();
    }
    swiper.update();
    setFocused(null);
    setSlideSize(swiper.slides[0].clientWidth)
    /*swiper.on('slideChange', function () {
      console.log('slide changed22');
    });*/
  }
  const dataChange = (i) => {
    setFocused(null);
    setTopNum(i);
    swiper.slideTo(0);
    if (i === 0) {
      setData(sortUpper(gwangju))
    } else if (i === 1) {
      setData(sortUpper(daegu))
    } else {
      setData(sortUpper(busan))
    }
  }

  const itemClick = (e, id) => {
    if (focused === null) {
      setFocused(id)
    } else {
      setFocused(null)
    }
  }

  const swComplete = (swiper) => {
    setSwiper(swiper)
    swiper.on('resize', function () {
      setSlideSize(swiper.slides[0].clientWidth);
    });
  }

  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    if (swiper) {
      setSlideSize(swiper.slides[0].clientWidth);
    }
    setData(daegu)
  }, [swiper]);

  return (
    <>
      <Head>
        <title>KF-21 Aircraft</title>
        <meta name="description" content="KF-21" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;200;300;400;500;700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;400;800&display=swap" rel="stylesheet"></link>
      </Head>
      <nav className={styles.nav}>
        <button className={styles.navButton}>A</button>
        <button className={styles.navButton}>B</button>
        <button className={styles.navButton}>V</button>
      </nav>
      <main className={classNames(styles.main)}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.topLogo}><div className={styles.logoBase}></div><div className={styles.logo} /></div>
            <div className={styles.topNav}>
              {
                topNav.map((item, idx) => {
                  return (
                    <button key={idx} className={classNames(styles.topButton, idx === topNum ? styles.active : null)} onClick={() => dataChange(idx)}>{item.title}</button>
                  )
                })
              }
            </div>
            <div className={styles.topView}>
              <span className={styles.viewText}>VIEW TYPE</span>
              <button className={classNames(styles.viewButton, type === 'list' && styles.active)} onClick={() => viewType('list')}><i className="ri-checkbox-blank-fill"></i></button>
              <button className={classNames(styles.viewButton, type === 'grid' && styles.active)} onClick={() => viewType('grid')}><i className="ri-layout-grid-fill"></i></button>
              <button className={classNames(styles.viewButton)} onClick={() => shuffleList()}><i className="ri-equalizer-fill"></i></button>
            </div>
          </div>
          <Flipper
            className={styles.flipper}
            flipKey={[data, type, focused]}
          >
            <div className={classNames(styles.swiperContainer, focused !== null && styles.active)}
            //onMouseEnter={() => setOver(true)}
            //onMouseLeave={() => setOver(false)}
            >
              <Swiper
                centeredSlides={true}
                className={classNames(type === "grid" ? "fm-grid" : "fm-list")}
                //onSwiper={setSwiper}
                onSwiper={(swiper) => swComplete(swiper)}
                allowTouchMove={false}
                mousewheel={true}
                keyboard={true}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 96
                  },
                  800: {
                    slidesPerView: 2,
                    spaceBetween: 96
                  },
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 96
                  },
                  1600: {
                    slidesPerView: 4,
                    spaceBetween: 96
                  },
                  2000: {
                    slidesPerView: 5,
                    spaceBetween: 96
                  },
                  2400: {
                    slidesPerView: 6,
                    spaceBetween: 96
                  },
                  2800: {
                    slidesPerView: 7,
                    spaceBetween: 96
                  },
                  3200: {
                    slidesPerView: 8,
                    spaceBetween: 96
                  },
                }}
              >
                {data.map((item, i) => {
                  return (
                    <SwiperSlide key={i} className={styles.SwiperSlide}>
                      {({ isActive }) => (
                        <ListItem key={'ListItem'} {...item} active={isActive} onClick={() => onClick(this)} />
                      )}
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>

            <div className={classNames(styles.baseContainer, (type === "grid" && !focused) && styles.active)}>
              <div className={styles.baseContents} style={{ width: slideSize + 'px', height: slideSize + 'px' }}>
                <div className={classNames(styles.baseBox, over ? styles.active : null)}>
                  <div className={styles.base}></div>
                </div>
              </div>
            </div>


            {focused === null ? (
              <Flipped flipId={'FlippedContainer'} key={'swiperContainer'}>
                <div className={styles.empty}>

                  <div className={styles.detail}>
                    <div className={styles.detailContainer} style={{ width: slideSize, height: slideSize }}>
                      <ul className={styles.detailContents} style={{ marginLeft: (slideSize - (type === 'list' ? 48 : 18)) * 0.5 }}>
                        <SideItem {...data.filter(v => v.id === focused)[0]} key={'sideItem'} />
                      </ul>
                      <ListItemExpend key={'ListItemExpend'} {...data.filter(v => v.id === focused)[0]} active={true} />
                    </div>
                  </div>

                </div>
              </Flipped>
            ) : (
              <Flipped flipId={'FlippedContainer'} key={'detailContainer'} translate>

                <div className={styles.detail}>
                  <div className={styles.detailContainer} style={{ width: slideSize, height: slideSize }}>
                    <ul className={styles.detailContents} style={{ marginLeft: (slideSize - (type === 'list' ? 48 : 18)) * 0.5 }}>
                      <SideItem {...data.filter(v => v.id === focused)[0]} key={'sideItem'} />
                    </ul>
                    <ListItemExpend key={'ListItemExpend'} {...data.filter(v => v.id === focused)[0]} active={true} />
                  </div>
                </div>

              </Flipped>
            )
            }
          </Flipper>
          <Step stepNum={stepNum} />
        </div>
      </main>
      <footer className={styles.footer}>
        Copyrights 2022 ROK Government kf-21 lis program data, ALL RIGHTS RESERVED
      </footer>
    </>
  )
}
export default App;