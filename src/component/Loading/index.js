import React, { useState, useRef, useEffect, useCallback } from 'react';
import './index.scss';
import Chart from '../Slide/chart';
import { shuffle } from '../Mixin';
import classNames from 'classnames';

const App = (props) => {

    let cc = 0;
    const duration = 1000;
    //console.log(title, meassage)
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
    const loop = useCallback(() => {
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
    }, [cc, maxCount, ment, props])

    const randomArray = useCallback((n, m) => {
        let arr = {};
        let total = 0;
        for (var i = 0; i < props.title.length; i++) {
            const value = Math.floor((Math.random() * (m - n) + n));//Math.round((Math.random() * v) * 10) / 10;
            arr[props.title[i]] = value;
            total += value;
        };
        return { array: arr, total: total / props.title.length };
    }, [props]);

    useEffect(() => {
        loop();
        return () => setEnd(null);
    }, [])

    return (
        <div className='load'>
            <div className={classNames('graph', flag && 'active')}>
                {props.title &&
                    <Chart item={end} total={percent} cur={start} />
                }
                <div className={'callButton'} onClick={() => { callBack(false) }}>
                    <span className='callButtonText'>{fix}</span>
                </div>
            </div>


        </div>
    );
}

export default App;
