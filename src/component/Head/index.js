import './index.scss';
import React, { useContext } from 'react';
import context from '../Context';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css';

const App = (props) => {
  const state = useContext(context);
  const { topNum, topNav, setTopNum, type, setType, setFocused, setCount } = state;

  const onClick = (id) => {
    setFocused(0);
    setCount(0);
    setTopNum(id)
  }

  const onType = (type) => {
    setFocused(0);
    setCount(0);
    setType(type)
  }

  return (
    <div className="head">
      <div className={'topLogo'} onClick={() => setTopNum(null)}>
        <div className={'logo'}>
          <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt={'logo'} />
        </div>
      </div>
      <div className={'topNav'}>
        <span className={'viewText'}>{topNav && topNav[topNum].기지}</span>
        {topNav && (
          topNav.map((item, index) => {
            return (
              <button key={index} className={classNames('topButton', index === topNum ? 'active' : null)} onClick={() => onClick(index)}>
                {item.대대}
              </button>
            )
          }))
        }
      </div>
      <div className={classNames('topView', type)}>
        <span className={'viewText'}>VIEW TYPE</span>
        <button className={classNames('viewButton', type === 'list' && 'active')} onClick={() => onType('list')}><i className="ri-checkbox-blank-fill"></i></button>
        <button className={classNames('viewButton', type === 'grid' && 'active')} onClick={() => onType('grid')}><i className="ri-layout-grid-fill"></i></button>
      </div>
    </div>
  );
}

App.defaultProps = {
  topNum: null,
  type: 'list',
};

export default App;
