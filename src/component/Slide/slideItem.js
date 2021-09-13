import './slideItem.scss';
import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'
import { Flipped } from 'react-flip-toolkit';
import { getColor } from '../Utill'
import context from '../Context';

import GuideBox from './guideBox';
import GueageBox from './gueage';

const App = (props) => {
    const state = useContext(context);
    const { focused, setFocused, type, setBase, setCount } = state;
    const index = props.index;
    const item = props.item;
    const margin = props.margin;
    const active = focused === index && type !== 'grid';
    const selectItem = props.selectItem;
    //
    let percentColor = getColor(item.engine, 0, 240);

    const onClick = () => {
        //setPrev(focused)
        selectItem(item)
        setFocused(index)
        setBase(true)
        type === 'list' && setCount(index);
    }

    return (
        <Flipped flipId={item.id} translate>
            <div key={item.id} className={classNames('listItem', active && 'active')}
                style={{ marginRight: type !== 'grid' && margin }}

            >
                <GuideBox value={item.engine} active={active} type={type} />
                <div className={'aircraftGroup'} >
                    <div className={'aircraft'}>
                        <img src={process.env.PUBLIC_URL + item.img} alt={'KF-21'} />
                    </div>
                </div>
                {(focused === index && type === 'list') ? (
                    <div className={classNames('item')} >
                        <div>
                            <GueageBox value={item.engine} color={percentColor} />
                            <span className={'itemRating'}>RATING POINT</span>
                            <div className={classNames('itemPercent')} style={{ color: percentColor }}>{item.engine}%</div>
                        </div>
                        <div className={'itemTitleGroup'}>
                            <div className={'itemTitle'}>{item.title}</div>
                            <span className={'itemSubText'}>Boramae</span>
                        </div>
                        <button className={'detailButton'} onClick={() => { onClick() }} />
                    </div>

                ) : (
                    <div className={classNames('item')} >
                        <div className={'itemTitle'}>{item.title}</div>
                        <GueageBox value={item.engine} color={percentColor} />
                        <div className={classNames('itemPercent')} style={{ color: percentColor }}>{item.engine}%</div>
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
