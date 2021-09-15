
import './filterBox.scss';
import classNames from 'classnames';
import React, { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';

const App = (props) => {
    let checkList = props.item;
    //const [checkList, setCheckList] = useState(props.item);
    //console.log(props.item, checkList)
    useEffect(() => {
       //setCheckList(props.item)
    }, [props.item])

    useMemo(() => {
        //console.log('useMemo', checkList)
    }, [checkList])

    const onCheck = e => {
        checkList[e.target.value] = e.target.checked ? 'Y' : 'N';
        //setCheckList(checkList)
        //console.log('onCheck:',checkList)
    }

    const CK = () => {
        const result = [];
        _.map(checkList, (v, k) => {
            const label = 'check' + k;
            result.push(<div key={'check' + k}>
                <input id={label} value={k} type={'checkbox'} checked={v === 'Y' && true} onChange={(e) => onCheck(e)} />
                <label>{k}</label>
            </div>)
        })
        return result;
    }

    return (
        <div className={classNames('filterContainer')}>
            <CK />
        </div>
    );
}

export default App;