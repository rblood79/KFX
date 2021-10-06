import React, { useState, useRef, useEffect, useContext } from 'react';
import './index.scss';
import Chart from '../Slide/chart';
import { shuffle } from '../Mixin';
import classNames from 'classnames';
import context from '../Context';

const App = (props) => {
    //console.log('loading')
    const state = useContext(context);
    const { size } = state;
    let cc = 0;
    const duration = 1000;
    const maxCount = props.meassage.length || 0;
    const callBack = props.callBack;
    const [end, setEnd] = useState([0, 0, 0, 0]);
    const [start] = useState([0, 0, 0, 0]);
    const [percent, setPercent] = useState(0);
    const [ment] = useState(shuffle(props.meassage));
    const [fix, setFix] = useState(props.startMsg);
    const timeout = useRef(null);
    const [flag, setFlag] = useState(false);
    //

    useEffect(() => {
        const loop = () => {
            if (props.title) {
                clearTimeout(timeout.current);
                let item = null;
                if (cc > maxCount - 1) {
                    item = randomArray(100, 100);
                    setFix(props.endMsg);
                } else {
                    item = randomArray(50, 100);
                    setFix(ment[cc])
                }

                if (cc < maxCount) {
                    cc++;
                    timeout.current = setTimeout(() => { loop() }, duration);
                } else {
                    setFlag(true);
                    timeout.current = setTimeout(() => {
                        callBack(false);
                        clearTimeout(timeout.current);
                    }, 1200);
                }
                setEnd(item.array);
                setPercent(item.total);
            }
        }
        const randomArray = (n, m) => {
            let arr = {};
            let total = 0;
            for (var i = 0; i < props.title.length; i++) {
                const value = Math.floor((Math.random() * (m - n) + n));
                arr[props.title[i]] = value;
                total += value;
            };
            return { array: arr, total: total / props.title.length };
        };
        loop();
        return () => setEnd(null);
    }, [cc, maxCount, ment, props.endMsg, props.title, callBack])

    return (
        <div className='load'>
            <div className={classNames('graph', flag && 'active')}>
                <Chart item={end} total={percent} cur={start} size={size}/>
                <div className={'loadingComment'} onClick={() => { callBack(false) }}>
                    <span className='loadingText'>{fix}</span>
                </div>
            </div>
        </div>
    );
}

export default App;
