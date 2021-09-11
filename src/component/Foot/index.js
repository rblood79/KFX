import './index.scss';
import React, { useState } from 'react';
import classNames from 'classnames';

const App = (props) => {
  const [stepData] = useState([
    { title: 'STEP 1', comment: 'Condition' },
    { title: 'STEP 2', comment: 'Aircraft' },
    { title: 'STEP 3', comment: 'Confirm' },
    { title: 'STEP 4', comment: 'Other' }
  ])
  return (
    <div className={'step'}>
      <ul className={'stepGroup'}>
        {
          stepData.map((item, idx) => {
            return (
              <li key={idx} className={classNames('stepItem', idx === props.stepNum ? 'active' : null)}>
                <span className={'stepItemTitle'}>{item.title}</span>
                <span className={'stepItemComment'}>{item.comment}</span>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

App.defaultProps = {
  stepNum: 0,
};

export default App;
