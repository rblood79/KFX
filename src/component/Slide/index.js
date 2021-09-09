import './index.scss';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'
import { Flipper, Flipped } from 'react-flip-toolkit';
//import { Swiper, SwiperSlide } from 'swiper/react';

const App = (props) => {
  const type = props.type;
  const data = props.data;
  const focused = props.focused;
  //
  useEffect(() => {
    console.log('slide', focused)
  }, [data]);

  return (
    <Flipper
      className={'flipper'}
      flipKey={[data, type, focused]}
    >
      <div className={classNames('sliderContainer', focused !== null && 'active')}>
        <div className={classNames('sliderContents', type === 'grid' && 'active')}>
          {data.map((item, i) => {
            return (
              <Flipped flipId={item.id} translate>
                <div className={'slideItem'}>{item.title}</div>
              </Flipped>
            )
          })}
        </div>
      </div>
    </Flipper>
  );
}

export default App;
