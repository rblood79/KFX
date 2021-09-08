import ReactDOM from "react-dom";
import React, { useContext, useState, useEffect, useRef, forwardRef, createContext } from 'react';
import classNames from 'classnames';
import styles from '../../styles/Home.module.scss'

const App = props => {



    useEffect(() => {
        //console.log('stepNum', props.stepNum);
    }, [props.topNum]);

    return (
        <div className={styles.top}>
            <div className={styles.topLogo}><div className={styles.logoBase}></div><div className={styles.logo} /></div>
            <div className={styles.topNav}>
                {
                    topNav.map((item, idx) => {
                        return (
                            <button key={idx} className={classNames(styles.topButton, idx === props.topNum ? styles.active : null)} onClick={() => dataChnge(idx)}>{item.title}</button>
                        )
                    })
                }
            </div>
            <div className={styles.topView}>
                <span className={styles.viewText}>VIEW TYPE</span>
                <button className={classNames(styles.viewButton, type === 'list' && styles.active)} onClick={() => viewType('list')}><i className="ri-checkbox-blank-fill"></i></button>
                <button className={classNames(styles.viewButton, type === 'grid' && styles.active)} onClick={() => viewType('grid')}><i className="ri-layout-grid-fill"></i></button>
                <button className={classNames(styles.viewButton)} onClick={() => shuffleList()}><i className="ri-equalizer-fill"></i></button>
            </div>
        </div>
    )
}

export default App;