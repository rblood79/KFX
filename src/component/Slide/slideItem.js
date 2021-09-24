import './slideItem.scss';
import React, { useContext, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'
import { Flipped } from 'react-flip-toolkit';
import { getColor } from '../Mixin'
import context from '../Context';
import GuideBox from './guideBox';
import GueageBox from './gueage';

import Aircraft from './aircraft';

const App = (props) => {
    const state = useContext(context);
    const { focused, setFocused, type, setBase, setCount, setTemp, temp } = state;
    const index = props.index;
    const item = props.item;
    const active = focused === index && type !== 'grid';
    const selectItem = props.selectItem;
    const id = item.호기ID;
    //
    let percentColor = getColor(item.TOTAL, 0, 240);

    const {number} = useSpring({
        from: {
            number: temp[4] || 0,
        },
        to: {
            number: item.TOTAL,
        },
        reset: true, //temp[4] === item.TOTAL ? false : true,
        delay: 200,
    });

    const onClick = () => {
        setTemp([0, 0, 0, 0])
        selectItem(item)
        setFocused(index)
        setBase(true)
        type === 'list' && setCount(index);
    }

    const getImage = (e) => {
        return 'assets/aircraft/' + e + '.png'
    }

    useEffect(() => {
        //console.log('item useEffect')
    }, [])

    return (
        <Flipped flipId={id} translate>
            <div key={item.호기ID} className={classNames('listItem', active && 'active')}>
                <GuideBox active={active} />
                <div className={'aircraftGroup'} >
                    <div className={'aircraft'}>
                        {/*<img src={getImage(item.기종)} alt={'KF-21'} />*/}
                        <Aircraft test={active ? 1 : 0}/>
                    </div>
                </div>
                {(focused === index && type === 'list') ? (
                    <div className={classNames('item')} >
                        
                        <button className={'detailButton'} onClick={() => { onClick() }} />
                    </div>
                ) : (
                    <div className={classNames('item')} >
                        <div className={'itemTitle'}>{item.호기}호기</div>
                        <GueageBox value={item.TOTAL} color={percentColor} />
                        <animated.div className={classNames('itemPercent')} style={{ color: percentColor }}>{type === 'grid' ? number.to(n => n.toFixed(2) + '%') : item.TOTAL + '%'}</animated.div>
                        <div className={'itemIndex'}>{index < 9 ? '0' + (index + 1) : (index + 1)}</div>
                        <button className={'detailButtonGrid'} onClick={() => { onClick() }} />
                    </div>
                )}
            </div>
        </Flipped>
    );
}

App.defaultProps = {
    focused: 0,
};

export default App;
