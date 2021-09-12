import './index.scss';
import React, { useContext, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'
import { Flipper, Flipped } from 'react-flip-toolkit';

import context from '../Context';
import SlideItem from './slideItem';
import ExpendItem from './expendItem';

import { shuffle } from '../Utill';

import { gwangju, daegu, busan, sa } from '../Data'

const App = (props) => {
  const state = useContext(context);
  const {topNum, type, focused, setFocused, base, prev } = state;

  const [startX, setStartX] = useState(0);
  const [posX, setPosX] = useState(0);
  const [itemWidth, setItemWidth] = useState(360);
  const [margin, setMargin] = useState(96);

  const [selectItem, setSelectItem] = useState(null);
  const [data, setData] = useState([]);

  //const [viewCount] =useState(5);
  const [col, setCol] = useState(9);
  const [row, setRow] = useState(1);
  const [end, setEnd] = useState();

  const sliderContainer = useRef(null);
  const sliderContents = useRef(null);
  //
  //
  const fn_startX = () => {
    if (sliderContainer) {
      setStartX(type === 'list' ? sliderContainer.current.clientWidth * 0.5 : 0);
    }
  }

  const moveX = (postion) => {
    if (postion === 'prev') {
      focused > 0 && setFocused(focused - 1);
    } else if (postion === 'next') {
      focused < end && setFocused(focused + 1);
    };
  }

  const gridX = () => {
    const total = data.length;
    let row = 1;
    let col = total;

    if (type === 'grid') {
      if (15 < total) {
        row = 3;
        col = Math.ceil(total / row);
      } else if (10 < total && total < 15) {
        row = 3;
        col = 5;
      } else if (5 < total && total < 10) {
        row = 2;
        col = 5;
      } else {
        row = 1;
        col = total;
      }
      setMargin(16);
    } else {
      setMargin(96);
    };

    setCol(col);
    setRow(row);
    setEnd(type === 'list' ? total - 1 : col - 5);
  }

  useEffect(() => {
    window.addEventListener('resize', fn_startX);
    return () => {
      window.removeEventListener('resize', fn_startX);
    }
  })

  useEffect(() => {
    if (type === 'list') {
      setPosX(Math.round(startX - ((itemWidth + margin) * focused) - (itemWidth * 0.5)))
    } else if (data.length > 15 && !base) {
      setPosX(Math.round(startX - ((itemWidth + margin) * focused)))
    };
  }, [focused, startX]);

  useEffect(() => {
    setFocused(0);
    type === 'grid' && setPosX(0);

    if (topNum === 0) {
      setData(gwangju);
    } else if (topNum === 1) {
      setData(daegu);
    } else if (topNum === 2) {
      setData(busan);
    } else if (topNum === 3) {
      setData(sa);
    }
  }, [topNum]);

  useEffect(() => {
    gridX();
    fn_startX();
    setFocused(0);
    setPosX(0);
  }, [type]);

  useEffect(() => {
    if (sliderContainer) {
      fn_startX();
    };
  }, [sliderContainer]);

  useEffect(() => {
    gridX();
  }, [data])

  return (
    <Flipper
      className={'slider'}
      flipKey={[data, type, focused]}
    >
      <div className={'filter'}>
        <button className={'filterButton'} onClick={() => setData(shuffle(data))}><i className="ri-equalizer-fill"></i></button>
        <button className={'filterButton'} onClick={() => moveX('prev')}>prev</button>
        <button className={'filterButton'} onClick={() => moveX('next')}>next</button>
      </div>
      <div className={classNames('sliderContainer', focused !== null && 'active')} ref={sliderContainer}>
        <div className={classNames('sliderContents', type === 'grid' && 'active')} ref={sliderContents}
          style={{
            transform: 'translateX(' + posX + 'px)',
            gridTemplateColumns: 'repeat(' + col + ', 360px)',
            gridTemplateRows: 'repeat(' + row + ', 160px)',
          }}
        >
          {
            data.map((item, i) => {
              return (
                <SlideItem item={item} index={i} focused={focused} margin={margin} key={'slideItem' + i} selectItem={setSelectItem} />
              )
            })
          }
        </div>
      </div>
      {(selectItem === null) ? (
        <Flipped flipId={'FlippedContainer'} key={'swiperContainer'} onComplete={() => {type==='grid'&&setFocused(prev)}}>
          <div className={'empty'}>
            <div className={'detail'}>
              <ExpendItem item={data[focused]} active={false} select={setSelectItem} key={'sideItem'} />
            </div>
          </div>
        </Flipped>
      ) : (
        <Flipped flipId={'FlippedContainer'} key={'swiperContainer'}>
          <div className={'detail'}>
            <ExpendItem item={data[focused]} active={true} select={setSelectItem} key={'sideItem'} />
          </div>
        </Flipped>
      )}
    </Flipper>
  );
}

App.defaultProps = {
  focused: 0,
};

export default App;
