import './index.scss';
import React, { useContext, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'
import { Flipper, Flipped } from 'react-flip-toolkit';
import { byKeys } from '../Mixin'

import context from '../Context';
import SlideItem from './slideItem';
import DetailItem from './detailItem';
import FocuseItem from './focusItem';

import { useGridNum, useMove, useData } from '../Mixin';
import _ from 'lodash';

const App = (props) => {
  //console.log('slide')
  const DS = props.data;
  const state = useContext(context);
  const { topNum, type, setType, focused, setFocused, count, setCount, base, setBase, setTemp, temp, size } = state;
  const [filterView, setFilterView] = useState(null);
  const [selectItem, setSelectItem] = useState(null);
  const [checkList, setCheckList] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [images, setImages] = useState(null);

  const sliderRef = useRef(null);
  const result = useData(DS, topNum, checkList);
  const grid = useGridNum(result.data && result.data.length, type, size);
  const move = useMove(type, count, grid);
  //const winSize = useWindowSize();
  const ess = DS[topNum].필수항목;
  const aver = DS[topNum].평균;
  const comment = DS[topNum].배정조건;


  //
  //const timeout = useRef(null);
  /*const autoSlide = () => {
    if (focused < grid.col - 1) {
      moveSlide('next');
    } else {
      setFocused(0);
      setCount(0);
    }
    timeout.current = setTimeout(() => { autoSlide() }, 2000);
  }*/

  const preLoad = () => {
    const arr = [];
    for (let i = 40; i <= 60; i++) {
      const preImage = new Image();
      preImage.src = process.env.PUBLIC_URL + '/assets/aircraft/TH50/FA_00' + i;
      arr.push(preImage);
    }
    setImages(arr);
  };

  const moveSlide = (postion) => {
    if (base) {
      const iarr = byKeys(result.data[focused], _.keys(ess))
      let arrItem = Object.keys(iarr).map(key => (iarr[key]));
      arrItem[4] = result.data[focused].TOTAL;
      setTemp(arrItem);
    } else {
      let tarr = [];
      for (let i = 0; i < 5; i++) {
        if (i !== 4) {
          tarr[i] = temp[i];
        } else {
          tarr[i] = result.data[focused].TOTAL
        };
      };
      setTemp(tarr);
    }

    if (postion === 'prev') {
      type === 'list' && focused > 0 && setFocused(focused - 1);
      count > 0 && setCount(count - 1);
    } else if (postion === 'next') {
      type === 'list' && focused < grid.end && setFocused(focused + 1);
      count < grid.end && setCount(count + 1);
    };
    //console.log(selectItem)
  };

  const onCheck = e => {
    let name = e.target.value;
    setCheckList(
      { ...checkList, [name]: e.target.checked ? 'Y' : 'N' }
    );
  };

  const onWindow = () => {
    window['returnFn'](result.data[focused]);
  }

  const fView = () => {
    if (filterView === null) {
      setFilterView('active');
      setType('grid');
    } else {
      setFilterView(null);
      setType('list');
    }
    setSelectItem(null);
    setBase(false)
    setFocused(0);
    setCount(0);
  }

  const CheckBox = () => {
    const result = [];

    const mergeList = _.merge({}, checkList, ess);

    const sortList = Object.entries(mergeList)
      .sort(([, a], [, b]) => a - b)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    console.log(sortList)

    _.map(sortList, (v, k) => {
      const label = 'check' + k;
      result.push(
        <div className={'checkbox'} key={'check' + k}>
          <div className='checkboxInput'><input id={label} className={'check'} value={k} type={'checkbox'} checked={(v === 'Y' || v !== 'N') && true} disabled={ess[k]} onChange={(e) => onCheck(e)} /></div>
          <div className={'checkboxText'} ><label htmlFor={label} className={'label'}>{k}</label>
            <span className={'comment'}>{comment[k]}</span></div>
        </div>
      )
    })
    return result;
  }

  useEffect(() => {
    setCheckList(DS[topNum].기준정보);
    preLoad();
  }, [DS, topNum]);

  return (
    <Flipper className={'slider'} flipKey={[result.data]}
      spring={{ stiffness: 560, damping: 56 }}
    >
      {
        result.data ? (
          selectItem === null ? (
            <Flipped flipId={'FlippedContainer'} key={'swiperContainer'} translate>
              <div className={classNames('slide')} ref={sliderRef}>
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
                {type !== 'grid' && <FocuseItem item={result.data[focused]} />}
                {type !== 'grid' && <button className={classNames('callButton', base && 'active')} style={{ marginTop: -Math.round((size * 0.5) * 1.414) + 10 }} onClick={onWindow}>
                  <i className="ri-check-fill"></i>
                  <span className='callButtonText'>선택</span>
                </button>}
              </div>

            </Flipped>
          ) : (
            <Flipped flipId={'FlippedContainer'} key={'swiperContainer'} translate>
              <div className={'detail'}>
                <DetailItem item={result.data[focused]} ess={ess} aver={aver} checkList={checkList} active={false} select={setSelectItem} key={'sideItem'} />
              </div>
            </Flipped>
          )

        ) : (
          <div>NO DATA</div>
        )
      }
      {result.data &&
        <div className={classNames('controller', type === 'grid' && 'active')} style={{ marginTop: Math.round(size * 0.5 * 1.414) }}>
          <button className={classNames('controllerButton prevButton', count === 0 && 'disabled')} onClick={() => count !== 0 && moveSlide('prev')}><i className="ri-arrow-left-s-line"></i><span className="controllText">이전호기</span></button>
          <button className={'controllerButton filterButton'} onClick={() => fView()}><i className={type === 'list' ? "ri-arrow-up-s-line" : "ri-close-fill"}></i><span className="controllText">배정조건</span></button>
          <button className={classNames('controllerButton nextButton', count >= grid.end && 'disabled')} onClick={() => count < grid.end && moveSlide('next')}><span className="controllText">다음호기</span><i className="ri-arrow-right-s-line"></i></button>
          {type === 'grid' &&
            <div className={classNames('filter')}>
              <div className={'filterClose'} onClick={() => fView()} />
              <CheckBox />
              <ul className={'filterInfo'}>
                <li className={'infobox boxdisable'}>필수</li>
                <li className={'infobox boxchecked'}>선택(변경가능)</li>
                <li className={'infobox boxnormal'}>미선택(선택가능)</li>
              </ul>
            </div>
          }
        </div>
      }
    </Flipper>
  );
}

App.defaultProps = {
  focused: 0,
};

export default App;
