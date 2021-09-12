import './expendItem.scss';
import React, { useContext, useState } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'
import { getColor, byKeys } from '../Utill'
import context from '../Context';



const App = (props) => {
    const state = useContext(context);
    const { type, setBase } = state;
    const item = props.item;
    const selectItem = props.select
    //
    let percentColor = item && getColor(item.engine, 0, 240);

    const [itemIcon] = useState([
        { name: '주기검사', icon: 'ri-tools-fill' },
        { name: '야간비행', icon: 'ri-contrast-2-fill' },
        { name: '외장변경', icon: 'ri-timer-line' },
        { name: '실무장여부', icon: 'ri-flight-takeoff-fill' },
        { name: '항공기등급', icon: 'ri-todo-line' },
        { name: '조종사컨디션', icon: 'ri-user-heart-line' },
        { name: '비행일수', icon: 'ri-calendar-line' },
        { name: '주요결함', icon: 'ri-pulse-line' },
    ])

    const SideItem = item => {
        const rr = byKeys(item, ['주기검사', '야간비행', '외장변경', '실무장여부', '항공기등급', '조종사컨디션', '비행일수', '주요결함'])
        const result = [];
        _.map(rr, (val, key) => {
            result.push(
                <li key={key} className={'sideItem'}>
                    <span className={'sideItemBase'} />
                    <span className={'sideItemIcon'}><i className={_.find(itemIcon, ['name', key]).icon}></i></span>
                    <span className={'sideItemTitle'}>{key}</span>
                    <span className={'sideItemValue'}>{key === '야간비행' ? <i className={'ri-check-fill'} /> : val}</span>
                </li>
            )
        })
        return result;
    }

    const onClick = () => {
        selectItem(null)
        setBase(false)
    }

    return (
        <div className={'detailContainer'} style={{ width: 360, height: 360 }}>
            <ul className={'detailContents'} style={{ 
                //marginLeft: (96 - (type === 'list' ? 48 : 18)) * 0.5
                marginLeft: '24px'
            }}>
                <SideItem {...item} type={type} key={'sideItem'} />
            </ul>
            <div className={classNames('listItem', 'listItemExpend')} >
                <div className={'graph'}>
                    <img src={process.env.PUBLIC_URL + '/assets/gr.png'} alt='graph' />
                </div>
                <div className={'itemTitle'}>{item && item.title}<span className={'itemTitleGray'}>BORAMAE</span></div>
                <span className={'itemPoint'}>MATCHING POINT</span>
                <div className={classNames('itemPercent')} style={{ color: percentColor }}>{item && item.engine}%</div>
                <button className={'detailButton'} onClick={() => { onClick() }}><span className={'detailText'}>Close</span></button>
            </div>
        </div>
    );
}

App.defaultProps = {
    focused: 1,
};

export default App;
