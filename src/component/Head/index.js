import './index.scss';
import React, { useContext } from 'react';
import context from '../Context';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css';

const App = (props) => {
  const data = props.data
  const state = useContext(context);
  const { topNum, topNav, setTopNum, setFocused, setCount, base } = state;

  const onClick = (id) => {
    setFocused(0);
    setCount(0);
    setTopNum(id);
  }

  return (
    <div className="head">
      <div className={'topLogo'} onClick={() => setTopNum(null)}>
        <div className={'logo'}>
          <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt={'logo'} />
        </div>
      </div>
      <div className={classNames('topNav', base && 'active')}>
        <span className={'viewText'}>{topNav && topNav[topNum].기지}</span>
        {data && (
          data.map((item, index) => {
            return (
              <button key={index} className={classNames('topButton', index === topNum ? 'active' : null)} onClick={() => !base && onClick(index)}>
                {item.대대}
              </button>
            )
          }))
        }
      </div>
    </div>
  );
}

App.defaultProps = {
  topNum: null,
  type: 'list',
};

export default App;
