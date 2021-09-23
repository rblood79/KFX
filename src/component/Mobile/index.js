import './index.scss';
import React, { useEffect } from 'react';
import classNames from 'classnames';

const App = (props) => {
  //const slideSize = 360;

  useEffect(() => {
  }, [])

  return (
    <div className={classNames('mobile')}>
      <div className='mobileBox' />
      <img className='mobileLogo' src={process.env.PUBLIC_URL + '/assets/logo.png'} alt={'logo'} />
      <span className='mobileMent'>아쉽게도 현재 모바일은 지원 하지 않습니다</span>
    </div>
  );
}

export default App;
