import './index.scss';
import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import context from '../Context';

const App = (props) => {
  const state = useContext(context);
  const { type, base } = state;
  const loading = props.loading;
  const slideSize = 360;

  const Line = () => {
    const result = [];
    for (let i = 0; i < 9; i++) {
      result.push(<span key={i} className={classNames('sliceLine')} />)
    }
    return result;
  }
  useEffect(() => {
  }, [])

  return (
    <div className={classNames('base', type !== 'grid' ? null : 'active', loading && 'loading')}>
      <div className={'baseContents'} style={{ width: slideSize, height: slideSize }}>
        <div className={classNames('baseBox')} />
        <div className={classNames('inBox')} />
        {!loading &&
          <div className={'detailButton'}>
            <div className={classNames('detailButtonContainer', base && 'active')}>
              <span className={'detailText'}>상세정보<i className={"ri-search-line"}></i></span>
              <span className={'detailText'}>닫기<i className={"ri-close-line"}></i></span>
            </div>
          </div>
        }
      </div>
      <div className={'slice'}>
        <Line />
      </div>
    </div>
  );
}

export default App;
