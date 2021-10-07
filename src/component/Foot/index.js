import './index.scss';
import React, { useState, useContext, useEffect } from 'react';
import context from '../Context';
import classNames from 'classnames';

const App = (props) => {
  const state = useContext(context);
  const { base, type } = state;
  const [stepData] = useState([
    { title: 'Search', comment: 'STEP 1' },
    { title: 'Aircraft', comment: 'STEP 2' },
    { title: 'Condition', comment: 'STEP 3' },
    { title: 'Decision', comment: 'STEP 4' }
  ]);

  const step = () => {
    let num = props.stepNum;
    if (type === 'grid') {
      num = 2;
    };
    return num;
  };
  
  useEffect(() => {
  }, [])
  return (
    <div className={'step'}>
      <ul className={classNames('stepGroup', base && 'active')}>
        {
          stepData.map((item, idx) => {
            return (
              <li key={idx} className={classNames('stepItem', idx === step() ? 'active' : null)}>
                <span className={'stepItemTitle'}>{item.title}</span>
                {/*<span className={'stepItemTitle'}>{item.title}</span>
                <span className={'stepItemComment'}>{item.comment}</span>*/}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

App.defaultProps = {
  stepNum: 1,
};

export default App;
