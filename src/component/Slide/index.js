import './index.scss';
import React, { useContext, useEffect, useState, useRef, useMemo } from 'react';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'
import { Flipper, Flipped } from 'react-flip-toolkit';

import context from '../Context';
import SlideItem from './slideItem';
import ExpendItem from './expendItem';

import { shuffle } from '../Utill';
import _ from 'lodash';

import { DS } from '../Data';

const App = (props) => {
  const state = useContext(context);
  const { topNum, type, base, focused, setFocused, count, setCount } = state;

  const [startX, setStartX] = useState(0);
  const [posX, setPosX] = useState(0);
  const [itemWidth, setItemWidth] = useState(360);
  const [margin, setMargin] = useState(96);

  const [selectItem, setSelectItem] = useState(null);
  const [data, setData] = useState([]);

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
      type === 'list' && focused > 0 && setFocused(focused - 1);
      count > 0 && setCount(count - 1);
    } else if (postion === 'next') {
      type === 'list' && focused < end && setFocused(focused + 1);
      count < end && setCount(count + 1);
    };
  }

  useEffect(() => {
    if (type === 'list') {
      setPosX(Math.round(startX - ((itemWidth + margin) * count) - (itemWidth * 0.5)))
    } else if (data.length > 15 && !base) {
      setPosX(Math.round(startX - ((itemWidth + margin) * count)))
    };
  }, [count, startX]);

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
  }, [])

  useMemo(() => {
    console.log('useMemo')
    setData(DS);
  }, [])

  useEffect(() => {
    setFocused(0);
    setCount(0);
    type === 'grid' && setPosX(0);

    if (topNum === 0) {
      const filterData = _.filter(DS, { LOCATION: '1B'});
      //console.log(filterData)
      const skip = ['id', 'title', 'img', 'LOCATION', 'SERIES', 'MISSION']
      //const xx = _.omit(DS, skip)
      var yy = _.map(filterData, function (n) {
        return _.omit(n, skip);
      });
      setData(filterData)
    } else if (topNum === 1) {
      const filterData = _.filter(DS, { LOCATION: '2B', SERIES: 'KF21' });
      setData(filterData)
    } else if (topNum === 2) {
      const filterData = _.filter(DS, { LOCATION: '3B', SERIES: 'T50' });
      setData(filterData)
    } else if (topNum === 3) {
      const filterData = _.filter(DS, { LOCATION: '4B', SERIES: 'T50' });
      setData(filterData)
    } else {
      setData(DS);
    }
  }, [topNum]);

  useEffect(() => {
    gridX();
    fn_startX();
    setFocused(0);
    setPosX(0);
    setCount(0);
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
        <button className={'filterButton'} onClick={() => moveX('prev')}><i className="ri-arrow-left-s-line"></i></button>
        <button className={'filterButton'} onClick={() => moveX('next')}><i className="ri-arrow-right-s-line"></i></button>
      </div>

      <div className={classNames('slide')} ref={sliderContainer}>
        <div className={classNames('list', type === 'grid' && 'active')} ref={sliderContents}
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
        <Flipped flipId={'FlippedContainer'} key={'swiperContainer'}
        //onComplete={() => {type==='grid'&&setFocused(prev)}}
        >
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
