import './index.scss';
import React, { useContext } from 'react';
import classNames from 'classnames';
import context from '../Context';

const App = (props) => {
  const state = useContext(context);
  const { type, focused, } = state;
  const slideSize = 360;

  return (
    <div className={classNames('base', (type === "grid" && !focused) && 'active')}>
      <div className={'baseContents'} style={{ width: slideSize , height: slideSize }}>
        <div className={classNames('baseBox')}>
          <div className={'base'} />
        </div>
      </div>
    </div>
  );
}

export default App;
