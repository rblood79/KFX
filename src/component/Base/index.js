import './index.scss';
import React, { useContext, useCallback } from 'react';
import classNames from 'classnames';
import context from '../Context';

const App = (props) => {
  //console.log('base')
  const state = useContext(context);
  const { type, base, size } = state;
  const loading = props.loading;
  const slideSize = size;
  const width = size * 11;
  const height = size * 10;

  const Line = useCallback(() => {
    const result = [];
    for (let i = 0; i < 11; i++) {
      result.push(<span key={'line' + i} className={classNames('sliceLine')} style={{ width: size, maxWidth: size, minWidth: size }} />)
    }
    return result;
  }, [size])

  return (
    <div className={classNames('base', type !== 'grid' ? null : 'active', loading && 'loading')}>
      <div className={'baseContents'} style={{ width: slideSize, height: slideSize }}>
        <div className={classNames('baseBox')} />
        <div className={classNames('inBox')} />
        {!loading &&
          <div className={'detailButton'} style={{ marginTop: Math.round(size * 0.5 * 1.414) - 74 }}>
            <div className={classNames('detailButtonContainer', base && 'active')}>
              <span className={'detailText'}>상세정보<i className={"ri-search-line"}></i></span>
              <span className={'detailText'}>닫기<i className={"ri-close-line"}></i></span>
            </div>
          </div>
        }
      </div>
      <div className={'slice'} style={{ width: width, height: height }}>
        {
          <Line key={'lineGroup'} />
        }
      </div>
    </div>
  );
}

export default App;
