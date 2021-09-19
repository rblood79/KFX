import './expendItem.scss';
import React, { useContext, useState, useEffect } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'
import { getColor, byKeys } from '../Mixin'
import context from '../Context';
import { animated, useSpring } from 'react-spring'

import Chart from './chart';

const App = (props) => {
    //console.log('ex')
    const state = useContext(context);
    const { type, setBase, focused, temp, } = state;
    const item = props.item;
    //const rank = props.index;
    const selectItem = props.select;
    const checkList = props.checkList;
    const ess = props.ess;
    const aver = props.aver;

    const items = byKeys(item, _.keys(checkList));
    const averItem = byKeys(aver, _.keys(checkList));
    //
    const percentColor = item && getColor(item.TOTAL, 0, 240);

    const pValue = useSpring({
        from: { val: 0 },
        to: {
            val: item.TOTAL,
            color: percentColor
        },
    });


    const iarr = byKeys(item, _.keys(ess))
    const arrItem = Object.keys(iarr).map(key => (iarr[key]));

    const [itemIcon] = useState([
        { name: '주기검사', icon: 'ri-tools-fill' },
        { name: '야간비행여부', icon: 'ri-contrast-2-fill' },
        { name: '외장변경', icon: 'ri-timer-line' },
        { name: '실무장여부', icon: 'ri-flight-takeoff-fill' },
        { name: '항공기등급', icon: 'ri-todo-line' },
        { name: '가동상태', icon: 'ri-user-heart-line' },
        { name: '최근비행', icon: 'ri-calendar-line' },
        { name: '주요결함', icon: 'ri-pulse-line' },
    ])

    const SideItem = item => {
        const result = [];
        _.map(items, (val, key) => {
            //const color = getColor(val, 0, 240)
            result.push(
                <li key={key} className={classNames('sideItem', checkList[key] === 'N' && 'disabled')}>
                    <span className={'sideItemBase'} />
                    <span className={'sideItemIcon'}><i className={_.find(itemIcon, ['name', key]).icon} /></span>
                    <span className={'sideItemTitle'}>{key}</span>
                    <span className={'sideItemValue'}>
                        {
                            checkList[key] === 'N' ?
                                <i className="ri-eye-off-line" /> :
                                <span className={'sideItemUd'}>{val}<i className={val > averItem[key] ? "ri-arrow-up-s-fill" : "ri-arrow-down-s-fill"}></i></span>
                        }
                    </span>
                </li>
            )
        })
        return result;
    }

    const onClick = () => {
        //setTemp(arrItem);
        selectItem(null);
        setBase(false);
    }

    useEffect(() => {

    }, [focused])

    return (
        <div className={'detailContainer'} style={{ width: 360, height: 360 }}>
            <ul className={'detailContents'}>
                <SideItem {...item} type={type} key={'sideItem'} />
            </ul>
            <div className={classNames('listItem', 'listItemExpend')} >
                <div className={'graph'}>
                    <Chart item={byKeys(item, _.keys(ess))} aver={byKeys(aver, _.keys(ess))} total={item.TOTAL} arr={arrItem} cur={temp} />
                </div>
                <div className={'itemRank'}></div>
                <div className={'itemTitle'}>{item && item.호기}호기 <span className={'itemTitleGray'}>BORAMAE</span></div>
                <span className={'itemPoint'}>MATCHING POINT</span>
                <animated.div className={classNames('itemPercent')} style={{ color: pValue.color }}>{pValue.val.interpolate((n) => n.toFixed(2) + '%')}</animated.div>
                <button className={'detailButton'} onClick={() => { onClick() }} />
            </div>
        </div>
    );
}

App.defaultProps = {
    focused: 0,
};

export default App;
