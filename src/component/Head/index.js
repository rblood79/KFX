import './index.scss';
import React, { useContext, useState } from 'react';
import context from '../Context';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css';

const App = (props) => {
  const state = useContext(context);
  const { topNum, setTopNum, type, setType } = state;
  const [topNav] = useState([
    { id: 0, title: 'GWANGJU 1B', },
    { id: 1, title: 'DAEGU 2B', },
    { id: 2, title: 'BUSAN 3B', },
  ]);
  //
  return (
    <div className="head">
      <div className={'topLogo'}>
        <div className={'logoBase'} />
        <div className={'logo'}>
          <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt={'logo'} />
        </div>
      </div>
      <div className={'topNav'}>
        {
          topNav.map((item, idx) => {
            return (
              <button key={idx} className={classNames('topButton', idx === topNum ? 'active' : null)} onClick={() => setTopNum(item.id)}>
                {item.title}
              </button>
            )
          })
        }
      </div>
      <div className={classNames('topView', type)}>
        <span className={'viewText'}>VIEW TYPE</span>
        <button className={classNames('viewButton', type === 'list' && 'active')} onClick={() => setType('list')}><i className="ri-checkbox-blank-fill"></i></button>
        <button className={classNames('viewButton', type === 'grid' && 'active')} onClick={() => setType('grid')}><i className="ri-layout-grid-fill"></i></button>
      </div>
    </div>
  );
}

App.defaultProps = {
  topNum: 0,
  type: 'list',
};

export default App;
