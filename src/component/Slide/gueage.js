
import './gueage.scss';
import classNames from 'classnames';
import React, { useEffect, useCallback } from 'react';
import { animated, useSpring } from 'react-spring';

const App = (props) => {
    const value = props.value;
    const color = props.color;

    const { number, } = useSpring({
        from: {
            number: 0,
        },
        to: {
            number: value,
        },
        reset: true,
        delay: 300,
    });

    const Gueage = useCallback(() => {
        const result = [];
        for (let i = 0; i < 10; i++) {
            result.push(<span key={i} className={classNames('boxGueage')} />)
        }
        return result;
    }, [])
    useEffect(() => {

    }, [])
    return (
        <div className={classNames('boxGueageContainer')}>
            <animated.div className={'boxGueageBase'} style={{ width: props.active ? number.to(n => n.toFixed(2) + '%') : value + '%', backgroundColor: color }} />
            <Gueage />
        </div>
    );
}

export default App;