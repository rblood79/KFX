import './index.scss';
import React, { useContext, useEffect, useState, useRef, } from 'react';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'
import { Flipper, Flipped } from 'react-flip-toolkit';

import context from '../Context';
import SlideItem from './slideItem';
import ExpendItem from './expendItem';
//import FilterBox from './filterBox';

import { useWindowSize, useGridNum, usePosition, useMove, shuffle } from '../Mixin';
import _ from 'lodash';

import { DS } from '../Data';

const App = (props) => {
  const state = useContext(context);
  const { topNum, setTopNav, type, focused, setFocused, count, setCount } = state;
  const [selectItem, setSelectItem] = useState(null);
  const [data, setData] = useState([]);

  const sliderContainer = useRef(null);
  const size = useWindowSize();
  const grid = useGridNum(data, type, topNum);
  const position = usePosition(sliderContainer, type, size);
  const move = useMove(type, count, grid, position);
  //
  const [wValue, setWValue] = useState(null);
  const [dValue, setDValue] = useState(null);
  const [keyArray, setKeyArray] = useState(null);

  const [checkList, setCheckList] = useState(null);

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

  function customizer(objValue) {
    if (objValue === 'N') {
      return 0;
    }
  }
  function aver(arr, keys) {
    let valueSum = 0;
    _.map(arr, (v, k) => {
      const found = keys.find(element => element === k);
      if (found) {
        valueSum += v
      }
    })
    return valueSum;
  }

  useEffect(() => {
    setCheckList(DS[topNum].기준정보);

    const weight = DS[topNum].가중치;
    const used = _.cloneDeep(DS[topNum].기준정보);
    const mUsed = _.mergeWith(used, weight, customizer);
    const keyArray = Object.keys(used);
    const sUsed = aver(mUsed, keyArray);
    const lists = _.cloneDeep(DS[topNum].호수추천);

    ///console.log('>>>', DS[topNum].기준정보, checkList)
    _.each(lists, (obj) => {
      let valueSum = 0;
      _.map(obj, (v, k) => {
        const found = keyArray.find(element => element === k);
        if (found) {
          valueSum += (v * mUsed[k])
        }
      })
      obj.TOTAL = Number((valueSum / sUsed).toFixed(2));
    });
    //
    setData(_.sortBy(lists, 'TOTAL').reverse());
    
  }, [topNum]);

  useEffect(() => {
    console.log('useEffect checkList', checkList)
  }, [checkList])

  const onCheck = e => {
    let name = e.target.value;
    setCheckList(
      { ...checkList, [name]: e.target.checked ? 'Y' : 'N' }
    )
  }

  const CheckBox = () => {
    const result = [];
    _.map(checkList, (v, k) => {
      const label = 'check' + k;
      result.push(<div key={'check' + k}>
        <input id={label} value={k} type={'checkbox'} checked={v === 'Y' && true} onChange={(e) => onCheck(e)} />
        <label>{k}</label>
      </div>)
    })
    return result;
  }

  const init = () => {
    console.log('useEffect INIT')
    let resultTop = [];
    _.forEach(DS, function (n, key) {
      resultTop.push(n.부대)
    });

    setTopNav(resultTop);
  }

  useEffect(() => {
    init();
  }, [DS])

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

            <div style={{ position: 'absolute', zIndex: 10000, left: 0, top: 0 }}>
              TYPE: {type} / COUNT: {count} / WIDTH: {size.width} / COL: {grid.col} / ROW: {grid.row} / End: {grid.end} / GAP: {grid.gap} / POS: {position.x} / MOVE: {move.x}
              <CheckBox />
            </div>
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
