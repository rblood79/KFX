import React, { useState, useRef, useEffect } from 'react';
import './index.scss';
import Base from '../Base';
import Chart from '../Slide/chart';
import { shuffle } from '../Mixin';

const App = (props) => {
    let cc = 0;
    const duration = 1000;
    const { title, meassage, startMsg, endMsg } = window['getProps']();
    //console.log(title, meassage)
    const maxCount = meassage.length || 0;
    const callBack = props.callBack;
    const [end, setEnd] = useState([0, 0, 0, 0]);
    const [start] = useState([0, 0, 0, 0]);
    const [percent, setPercent] = useState(0);
    const [ment, setMent] = useState(meassage);
    const [fix, setFix] = useState(startMsg);
    const timeout = useRef(null);

    //
    const loop = () => {
        if (title) {
            clearTimeout(timeout.current);
            let item = null;
            if (cc > maxCount - 1) {
                item = randomArray(100, 100);
                setFix(endMsg)
            } else {
                item = randomArray(50, 100);
                setFix(ment[cc])
            }

            if (cc < maxCount) {
                cc++;
                timeout.current = setTimeout(() => { loop() }, duration);
            } else {
                callBack(false);
            }
            setEnd(item.array);
            setPercent(item.total);
        }
    }


    const randomArray = (n, m) => {
        let arr = {};
        let total = 0;
        for (var i = 0; i < title.length; i++) {
            const value = Math.floor((Math.random() * (m - n) + n));//Math.round((Math.random() * v) * 10) / 10;
            arr[title[i]] = value;
            total += value;
        };
        return { array: arr, total: total / title.length };
    };

    useEffect(() => {
        setMent(shuffle(meassage))
        return () => setEnd(null);
    }, [meassage])

    useEffect(() => {
        loop()
    }, [])

    return (
        <div className='loading'>
            <Base loading={true} />
            <div className={'graph'}>{title &&
                <Chart item={end} total={percent} cur={start} />}
            </div>

            <div className={'callButton'} onClick={() => { callBack(false) }}>
                <span className='callButtonText'>{fix}</span>
            </div>
        </div>
    );
}

export default App;
