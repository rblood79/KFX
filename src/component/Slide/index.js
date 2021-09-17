import './index.scss';
import React, { useContext, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'
import { Flipper, Flipped } from 'react-flip-toolkit';

import context from '../Context';
import SlideItem from './slideItem';
import ExpendItem from './expendItem';
//import GuideBox from './guideBox';

import { useWindowSize, useGridNum, usePosition, useMove, useData } from '../Mixin';
import _ from 'lodash';

import { DS } from '../Data';

const App = (props) => {
  //console.log('slide start')
  const state = useContext(context);
  const { topNum, setTopNav, type, setType, focused, setFocused, count, setCount } = state;
  const [selectItem, setSelectItem] = useState(null);

  const [checkList, setCheckList] = useState(null);

  const sliderContainer = useRef(null);
  const size = useWindowSize();

  const result = useData(DS, topNum, checkList);
  
  const grid = useGridNum(sliderContainer, result.data && result.data.length, type);
  
  const position = usePosition(sliderContainer, type, size);
  const move = useMove(type, count, grid, position);

  const [filterView, setFilterView] = useState(null);
  //

  const moveSlide = (postion) => {
    if (postion === 'prev') {
      type === 'list' && focused > 0 && setFocused(focused - 1);
      count > 0 && setCount(count - 1);
    } else if (postion === 'next') {
      type === 'list' && focused < grid.end && setFocused(focused + 1);
      count < grid.end && setCount(count + 1);
    };
  };

  const onCheck = e => {
    let name = e.target.value;
    setCheckList(
      { ...checkList, [name]: e.target.checked ? 'Y' : 'N' }
    );
  };

  const fView = () => {
    if (filterView === null) {
      setFilterView('active')
      setType('grid')
    } else {
      setFilterView(null)
      setType('list')
    }
    setFocused(0);
    setCount(0);
  }

  const CheckBox = () => {
    const ess = DS[topNum].필수항목;
    const result = [];
    _.map(checkList, (v, k) => {
      const label = 'check' + k;
      result.push(
        <div className={'checkbox'} key={'check' + k}>
          {/*<GuideBox />*/}
          <input id={label} className={'check'} value={k} type={'checkbox'} checked={v === 'Y' && true} disabled={ess[k]} onChange={(e) => onCheck(e)} />
          <div className={'checkboxText'}><label htmlFor={label} className={'label'}>{k}</label>
            <span className={'comment'}>임무 투입전 항공기.....</span></div>
        </div>
      )
    })
    return result;
  }
  
  const init = () => {
    //console.log('useEffect INIT')
    let resultTop = [];
    _.forEach(DS, function (n, key) {
      resultTop.push(n.부대)
    });
    setTopNav(resultTop);
  }

  useEffect(() => {
    setCheckList(DS[topNum].기준정보);
  }, [topNum]);

  useEffect(() => {
    init();
  }, [DS])

  return (
    <Flipper className={'slider'} flipKey={[result.data]}>
      {result.data ? (
        <>
          <div className={classNames('controller', type === 'grid' && 'active')}>
            <button className={'controllerButton prevButton'} onClick={() => moveSlide('prev')}><i className="ri-arrow-left-s-line"></i><span className="controllText">PREV</span></button>
            <button className={'controllerButton filterButton'} onClick={() => fView()}><i className={type === 'list' ? "ri-filter-fill" : "ri-close-fill"}></i><span className="controllText">배정조건</span></button>
            <button className={'controllerButton nextButton'} onClick={() => moveSlide('next')}><span className="controllText">NEXT</span><i className="ri-arrow-right-s-line"></i></button>
            <div className={classNames('filter', filterView)}>
              <div className={'filterClose'} onClick={() => fView()} />
              <CheckBox />
              <ul className={'filterInfo'}>
                <li className={'infobox boxdisable'}>필수</li>
                <li className={'infobox boxchecked'}>선택</li>
                <li className={'infobox boxnormal'}>선택가능</li>
              </ul>
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
                result.data.map((item, i) => {
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
                  <ExpendItem item={result.data[focused]} checkList={checkList} active={false} select={setSelectItem} key={'sideItem'} />
                </div>
              </div>
            </Flipped>
          ) : (
            <Flipped flipId={'FlippedContainer'} key={'swiperContainer'}>
              <div className={'detail'}>
                <ExpendItem item={result.data[focused]} checkList={checkList} active={true} select={setSelectItem} key={'sideItem'} />
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
