import './slideItem.scss';
import React, { useContext,} from 'react';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'
import { Flipped } from 'react-flip-toolkit';
import { getColor } from '../Mixin'
import context from '../Context';

import GuideBox from './guideBox';
import GueageBox from './gueage';

const App = (props) => {
    const state = useContext(context);
    const { focused, setFocused, type, setBase, setCount } = state;
    const index = props.index;
    const item = props.item;
    const active = focused === index && type !== 'grid';
    const selectItem = props.selectItem;
    //
    let percentColor = getColor(item.TOTAL, 0, 240);

    const onClick = () => {
        //setPrev(focused)
        selectItem(item)
        setFocused(index)
        setBase(true)
        type === 'list' && setCount(index);
    }

    const getImage = (e) =>{
        return 'assets/aircraft/' + e + '.png'
    }

    return (
        <Flipped flipId={item.호기ID} translate>
            <div key={item.호기ID} className={classNames('listItem', active && 'active')}>
                <GuideBox active={active}/>
                <div className={'aircraftGroup'} >
                    <div className={'aircraft'}>
                        <img src={getImage(item.기종)} alt={'KF-21'} />
                    </div>
                </div>
                {(focused === index && type === 'list') ? (
                    <div className={classNames('item')} >
                        <div>
                            <GueageBox value={item.TOTAL} color={percentColor} />
                            <span className={'itemRating'}>RATING POINT</span>
                            <div className={classNames('itemPercent')} style={{ color: percentColor }}>{item.TOTAL}%</div>
                        </div>
                        <div className={'itemTitleGroup'}>
                            <div className={'itemTitle'}>{item.호기}</div>
                            <span className={'itemSubText'}>Boramae</span>
                        </div>
                        <button className={'detailButton'} onClick={() => { onClick() }} />
                    </div>
                ) : (
                    <div className={classNames('item')} >
                        <div className={'itemTitle'}>{item.호기}</div>
                        <GueageBox value={item.TOTAL} color={percentColor} />
                        <div className={classNames('itemPercent')} style={{ color: percentColor }}>{item.TOTAL}%</div>
                        <div className={'itemIndex'}>{index < 9 ? '0' + (index+1) : (index+1)}</div>
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
