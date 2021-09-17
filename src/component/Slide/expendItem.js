import './expendItem.scss';
import React, { useContext, useState, useRef } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'
import { getColor, byKeys } from '../Mixin'
import context from '../Context';
import { useEffect } from 'react/cjs/react.development';



const App = (props) => {
    const state = useContext(context);
    const { type, setBase, focused } = state;
    const item = props.item;
    const selectItem = props.select;
    const checkList = props.checkList;

    const canvasRef = useRef(null);
    //console.log(item)
    //console.log(checkList)
    //
    let percentColor = item && getColor(item.TOTAL, 0, 240);

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
        const items = byKeys(item, _.keys(checkList))
        const result = [];
        _.map(items, (val, key) => {
            //const color = getColor(val, 0, 240)
            result.push(
                <li key={key} className={classNames('sideItem', checkList[key] === 'N' && 'disabled')}>
                    <span className={'sideItemBase'} />
                    <span className={'sideItemIcon'}><i className={_.find(itemIcon, ['name', key]).icon} /></span>
                    <span className={'sideItemTitle'}>{key}</span>
                    <span className={'sideItemValue'}>{checkList[key] === 'N' ? <i className="ri-eye-off-line" /> : val}</span>
                </li>
            )
        })
        return result;
    }

    const render = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        console.log(canvas.width)
        if (context) {
            context.strokeStyle = "red";  // 선 색깔
            context.lineJoin = 'round';	// 선 끄트머리(?)
            context.lineWidth = 1;		// 선 굵기

            context.beginPath();
            context.moveTo(canvas.width * .5, 0);
            context.lineTo(canvas.width * .5, canvas.height);


            context.moveTo(0, canvas.height * .5);
            context.lineTo(canvas.width, canvas.height * .5);
            context.closePath();

            context.stroke();

            context.font = '16px serif';
            context.textAlign = 'center';
            context.fillText('가동상태', canvas.width * .5, 20);
        }
    }

    const onClick = () => {
        selectItem(null);
        setBase(false);
    }

    useEffect(() => {
        render();
    }, [focused])

    return (
        <div className={'detailContainer'} style={{ width: 360, height: 360 }}>
            <ul className={'detailContents'}>
                <SideItem {...item} type={type} key={'sideItem'} />
            </ul>
            <div className={classNames('listItem', 'listItemExpend')} >
                <div className={'graph'}>
                    {/*<img src={process.env.PUBLIC_URL + '/assets/gr.png'} alt='graph' />*/}
                    <canvas ref={canvasRef} className="canvas" width={360} height={360} />
                </div>
                <div className={'itemTitle'}>{item && item.호기}<span className={'itemTitleGray'}>BORAMAE</span></div>
                <span className={'itemPoint'}>MATCHING POINT</span>
                <div className={classNames('itemPercent')} style={{ color: percentColor }}>{item && item.TOTAL}%</div>
                <button className={'detailButton'} onClick={() => { onClick() }} />
            </div>
        </div>
    );
}

App.defaultProps = {
    focused: 1,
};

export default App;
