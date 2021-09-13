import './index.scss';
import React, { useContext } from 'react';
import classNames from 'classnames';
import context from '../Context';

const App = (props) => {
  const state = useContext(context);
  const { type, base, focused } = state;
  const slideSize = 360;

  return (
    <div className={classNames('base', type !== 'grid' ? null : !base && 'active')}>
      <div className={'baseContents'} style={{ width: slideSize, height: slideSize }}>
        <div className={classNames('baseBox')}>
          <div className={'base'} />
        </div>
        <div className={'detailButton'}>
          <div className={classNames('detailButtonContainer', base && 'active')}>
            <span className={'detailText'}>상세정보<i class="ri-search-line"></i></span>
            <span className={'detailText'}>닫기<i class="ri-close-line"></i></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
