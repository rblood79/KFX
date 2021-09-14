import './index.scss';
import React, { useContext, useEffect, useState, useRef, } from 'react';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'
import { Flipper, Flipped } from 'react-flip-toolkit';

import context from '../Context';
import SlideItem from './slideItem';
import ExpendItem from './expendItem';

import { useWindowSize, useGridNum, usePosition, useMove, shuffle } from '../Mixin';
import _ from 'lodash';

import { DS, } from '../Data';

const App = (props) => {
  const state = useContext(context);
  const { topNum, type, focused, setFocused, count, setCount } = state;
  const [selectItem, setSelectItem] = useState(null);
  const [data, setData] = useState([]);

  const sliderContainer = useRef(null);
  const size = useWindowSize();
  const grid = useGridNum(data, type);
  const position = usePosition(sliderContainer, type, size);
  const move = useMove(type, count, grid, position);

  //
  const moveSlide = (postion) => {
    if (postion === 'prev') {
      type === 'list' && focused > 0 && setFocused(focused - 1);
      count > 0 && setCount(count - 1);
    } else if (postion === 'next') {
      type === 'list' && focused < grid.end && setFocused(focused + 1);
      count < grid.end && setCount(count + 1);
    };
  }

  useEffect(() => {
    if (topNum === 0) {
      const filterData = _.filter(DS, { LOCATION: '1B' });
      /*console.log(filterData)
      const skip = ['id', 'title', 'img', 'LOCATION', 'SERIES', 'MISSION']
      const xx = _.omit(DS, skip)
      var yy = _.map(filterData, function (n) {
        return _.omit(n, skip);
      });*/
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

  /*useMemo(() => {
    console.log('useMemo', temp)
  }, [])*/

  return (
    <Flipper
      className={'slider'}
      flipKey={[data]}
    >
      {data ? (
        <>
          <div className={'filter'}>
            <button className={'filterButton'} onClick={() => setData(shuffle(data))}><i className="ri-equalizer-fill"></i></button>
            <button className={'filterButton'} onClick={() => moveSlide('prev')}><i className="ri-arrow-left-s-line"></i></button>
            <button className={'filterButton'} onClick={() => moveSlide('next')}><i className="ri-arrow-right-s-line"></i></button>

            <div style={{ position: 'absolute', zIndex: 10000, left: 0, top: 0 }}>TYPE: {type} / COUNT: {count} / WIDTH: {size.width} / COL: {grid.col} / ROW: {grid.row} / End: {grid.end} / GAP: {grid.gap} / POS: {position.x} / MOVE: {move.x}</div>
          </div>
          <div className={classNames('slide')} ref={sliderContainer}>
            <div className={classNames('list', type === 'grid' && 'active')}
              style={{
                transform: 'translateX(' + move.x + 'px)',
                gridTemplateColumns: 'repeat(' + grid.col + ', ' + grid.width + 'px)',
                gridTemplateRows: 'repeat(' + grid.row + ', ' + grid.height + 'px)',
                gap: grid.gap,
              }}
            >
              {
                data.map((item, i) => {
                  return (
                    <SlideItem item={item} index={i} focused={focused} key={'slideItem' + i} selectItem={setSelectItem} />
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
        </>
      ) : (
        <div>empty</div>
      )}

    </Flipper>
  );
}

App.defaultProps = {
  focused: 0,
};

export default App;
