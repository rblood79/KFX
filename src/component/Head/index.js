import './index.scss';
import React, { useEffect} from 'react';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'

const App = (props) => {
  const topNav = props.topNav;
  const topNum = props.topNum;
  const type = props.type;
  //
  useEffect(() => {
    
  });

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
              <button key={idx} className={classNames('topButton', idx === topNum ? 'active' : null)} onClick={() => props.callBack(item.id)}>
                {item.title}
              </button>
            )
          })
        }
      </div>
      <div className={classNames('topView', type)}>
        <span className={'viewText'}>VIEW TYPE</span>
        <button className={classNames('viewButton', type === 'list' && 'active')} onClick={() => props.callBackType('list')}><i className="ri-checkbox-blank-fill"></i></button>
        <button className={classNames('viewButton', type === 'grid' && 'active')} onClick={() => props.callBackType('grid')}><i className="ri-layout-grid-fill"></i></button>
        <button className={classNames('viewButton')} onClick={() => props.callBackSort()}><i className="ri-equalizer-fill"></i></button>
      </div>
    </div>
  );
}

App.defaultProps = {
  topNum: 0,
};

export default App;
