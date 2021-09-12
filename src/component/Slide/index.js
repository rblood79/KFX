import './index.scss';
import React, { useContext, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'
import { Flipper, Flipped } from 'react-flip-toolkit';

import context from '../Context';
import SlideItem from './slideItem';
import ExpendItem from './expendItem';

import { shuffle } from '../Utill';

import { gwangju, daegu, busan } from '../Data'

const App = (props) => {
  const state = useContext(context);
  const { topNum, type, focused, setFocused, } = state;
  const [startX, setStartX] = useState(0);
  const [posX, setPosX] = useState(0);
  const [itemWidth, setItemWidth] = useState(360);
  const [margin, setMargin] = useState(96);


  const [selectItem, setSelectItem] = useState(null);
  const [data, setData] = useState([]);

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
      focused > 0 && setFocused(focused - 1)
    } else if (postion === 'next') {
      focused < data.length - 1 && setFocused(focused + 1)
    } else {

    }
  }

  useEffect(() => {
    type === 'list' ? setPosX(Math.round(startX - ((itemWidth + margin) * focused) - (itemWidth * 0.5))) : setPosX(0);
  }, [focused, startX]);

  useEffect(() => {
    setFocused(0);
    if (topNum === 0) {
      setData(gwangju);
    } else if (topNum === 1) {
      setData(daegu);
    } else if (topNum === 2) {
      setData(busan);
    }
  }, [topNum]);

  useEffect(() => {
    fn_startX();
    setFocused(0);
  }, [type]);

  useEffect(() => {
    if (sliderContainer) {
      fn_startX();
    }
  }, [sliderContainer]);

  useEffect(() => {
    window.addEventListener('resize', fn_startX);
    return () => {
      window.removeEventListener('resize', fn_startX);
    }
  })

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
          style={{ transform: 'translateX(' + posX + 'px)' }}
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
        <Flipped flipId={'FlippedContainer'} key={'swiperContainer'}>
          <div className={'empty'}>
            <div className={'detail'}>
              <ExpendItem item={data[focused]} active={false} select={setSelectItem} key={'sideItem'}/>
            </div>
          </div>
        </Flipped>
      ) : (
        <Flipped flipId={'FlippedContainer'} key={'swiperContainer'}>
          <div className={'detail'}>
            <ExpendItem item={data[focused]} active={true} select={setSelectItem} key={'sideItem'}/>
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
