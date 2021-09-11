import './index.scss';
//import React, { useEffect, } from 'react';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'
import { Flipper,} from 'react-flip-toolkit';

import SlideItem from './slideItem';

const App = (props) => {
  const type = props.type;
  const data = props.data;
  const focused = props.focused;
  //
  /*useEffect(() => {
    console.log('slide', focused)
  }, [data]);*/

  return (
    <Flipper
      className={'flipper'}
      flipKey={[data, type, focused]}
    >
      <div className={classNames('sliderContainer', focused !== null && 'active')}>
        <div className={classNames('sliderContents', type === 'grid' && 'active')}>
          {data.map((item, i) => {
            return (
              <SlideItem item={item} index={i} focused={focused} key={'slideItem' + i} />
            )
          })}
        </div>
      </div>
    </Flipper>
  );
}

App.defaultProps = {
  focused: null,
};

export default App;
