import './slideItem.scss';
//import React, { useEffect, } from 'react';
import classNames from 'classnames';
import 'remixicon/fonts/remixicon.css'
import { Flipped } from 'react-flip-toolkit';
import { getColor } from '../Utill'

const App = (props) => {
    const index = props.index;
    const item = props.item;
    const focused = props.focused;
    //
    let percentColor = getColor(item.engine, 0, 240);

    return (
        <Flipped flipId={item.id} translate>
            {/*<div className={classNames('slideItem', focused && 'active')}>
                {index} - 
                {item.title} / 
                {item.engine}
            </div>*/}
            <div key={item.id} className={classNames('listItem', focused && 'active')}>
                <div className={classNames('boxLineGroup')}>
                    {
                        //boxLine(item)
                    }
                </div>
                <div className={'aircraftGroup'}>
                    <div className={'aircraft'}>
                        <img src={process.env.PUBLIC_URL + item.img} />
                    </div>
                </div>

                <div className={classNames('itemSwitch')}>
                    <div className={'itemTitle'}>{item.title}</div>
                    <div className={'itemGueage'}>
                        <div className={'itemBar'} style={{ width: item.engine + '%', backgroundColor: percentColor }} />
                        {
                            //gueaguBox()
                        }
                    </div>
                    <div className={classNames('itemPercent')} style={{ color: percentColor }}>{item.engine}%</div>
                </div>

                <div className={classNames('itemSwitchActive')}>
                    <div>
                        <div className={'itemGueage'}>
                            <div className={'itemBar'} style={{ width: item.engine + '%', backgroundColor: percentColor }} />
                            {
                                //gueaguBox()
                            }
                        </div>
                        <span className={'itemRating'}>RATING POINT</span>
                        <div className={classNames('itemPercent')} style={{ color: percentColor }}>{item.engine}%</div>
                    </div>
                    <div className={'itemTitleGroup'}>
                        <div className={'itemTitle'}>{item.title}</div>
                        <span className={'itemSubText'}>Boramae</span>
                    </div>
                </div>
            </div>
        </Flipped>
    );
}

App.defaultProps = {
    focused: 1,
};

export default App;
