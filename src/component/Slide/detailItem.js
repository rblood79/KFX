import './detailItem.scss';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css';
import { getColor, byKeys } from '../Mixin';
import context from '../Context';
import { animated, useSpring } from 'react-spring';

import Chart from './chart';

const App = (props) => {
    const state = useContext(context);
    const { setBase, temp, base, size } = state;
    const item = props.item;
    const selectItem = props.select;
    const checkList = props.checkList;
    const ess = props.ess;
    const aver = props.aver;

    const items = byKeys(item, _.keys(checkList));
    const averItem = byKeys(aver, _.keys(checkList));
    //
    const percentColor = item && getColor(item.TOTAL, 0, 240);

    const { number, color } = useSpring({
        from: {
            number: temp[4] || 0
        },
        to: {
            number: item.TOTAL,
            color: percentColor
        },
        reset: true,
    });

    //const iarr = byKeys(item, _.keys(ess))
    //const arrItem = Object.keys(iarr).map(key => (iarr[key]));

    const [itemIcon] = useState([
        { name: '주기검사', icon: 'ri-tools-fill' },
        { name: '야간비행여부', icon: 'ri-contrast-2-fill' },
        { name: '외장변경', icon: 'ri-timer-line' },
        { name: '실무장여부', icon: 'ri-flight-takeoff-fill' },
        { name: '항공기등급', icon: 'ri-todo-line' },
        { name: '가동상태', icon: 'ri-dashboard-2-line' },
        { name: '최근비행', icon: 'ri-calendar-line' },
        { name: '주요결함', icon: 'ri-pulse-line' },
    ])

    const SideItem = useCallback((item) => {
        const result = [];
        _.map(items, (val, key) => {
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
        });
        return result;
    }, [averItem, checkList, itemIcon, items,])

    const onClick = () => {
        selectItem(null);
        setBase(false);
    }

    useEffect(() => {
    }, [])
    return (
        <div className={'detailContainer'} style={{ width: size, height: size }}>
            <ul className={'detailContents'} style={{ marginLeft: Math.round(size * 0.5 * 1.414) - 94, top: 32 + Math.round((size - 282) * 0.5) }}>
                <SideItem {...item} />
            </ul>
            <div className={classNames('listItem', 'listItemExpend')} >
                <div className={'graph'}>
                    {base && <Chart item={byKeys(item, _.keys(ess))} aver={byKeys(aver, _.keys(ess))} total={item.TOTAL} cur={temp} numView={true} size={size} />}
                </div>
                <div className={'itemTitle'}>{item && item.호기} <span className={'itemTitleGray'}>BORAMAE</span></div>
                <span className={'itemPoint'}>RAITING POINT</span>
                <animated.div className={classNames('itemPercent')} style={{ color: color }}>
                    {number.to(n => n.toFixed(2) + '%')}
                </animated.div>
                <button className={'detailButton'} onClick={() => { onClick() }} />
            </div>
        </div>
    );
}

App.defaultProps = {
    focused: 0,
};

export default App;
