
import './gueage.scss';
import classNames from 'classnames';
/*import React, { useContext, } from 'react';
import context from '../Context';*/

const App = (props) => {
    /*const state = useContext(context);
    const { focused } = state;*/
    const value = props.value;
    const color = props.color;

    const Gueage = () => {
        const result = [];
        for (let i = 0; i < 10; i++) {
            result.push(<span key={i} className={classNames('boxGueage')} />)
        }
        return result;
    }
    return (
        <div className={classNames('boxGueageContainer')}>
            <div className={'boxGueageBase'} style={{ width: value + '%', backgroundColor: color }}/>
            <Gueage />
        </div>
    );
}

export default App;