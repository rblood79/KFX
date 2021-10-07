import './focuseItem.scss';
import React, { useContext, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'
import { getColor } from '../Mixin'
import context from '../Context';
import GueageBox from './gueage';

const App = (props) => {
    
    const state = useContext(context);
    const { temp } = state;
    const item = props.item;
    //
    let percentColor = getColor(item.TOTAL, 0, 240);

    const { number } = useSpring({
        from: {
            number: temp[4] || 0,
        },
        to: {
            number: item.TOTAL,
        },
        reset: true,
        delay: 200,
    });

    useEffect(() => {
        //console.log('item useEffect')
    }, [])

    return (
        <div className={classNames('focuseItem')} >
            <div className={'itemPercentGroup'} >
                <GueageBox value={item.TOTAL} color={percentColor} />
                <span className={'itemRating'}>RATING POINT</span>
                <animated.div className={classNames('itemPercent')} style={{ color: percentColor }}>{number.to(n => n.toFixed(2) + '%')}</animated.div>
            </div>
            <div className={'itemTitleGroup'} >
                <div className={'itemTitle'}>{item.호기}</div>
                <span className={'itemSubText'}>Boramae</span>
            </div>
        </div>
    );
}

App.defaultProps = {
    focused: 0,
};

export default App;
