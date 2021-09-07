import ReactDOM from "react-dom";
import React, { useContext, useState, useEffect, useRef, forwardRef, createContext } from 'react';
import classNames from 'classnames';
import styles from '../../styles/Home.module.scss'

const App = props => {
    const [stepData] = useState([
        { title: 'STEP 1', comment: 'Condition' },
        { title: 'STEP 2', comment: 'Aircraft' },
        { title: 'STEP 3', comment: 'Confirm' },
        { title: 'STEP 4', comment: 'Other' }
    ])


    useEffect(() => {
        //console.log('stepNum', props.stepNum);
    }, [props.stepNum]);

    return (
        <div className={styles.step}>
            <ul className={styles.stepGroup}>
                {
                    stepData.map((item, idx) => {
                        return (
                            <li key={idx} className={classNames(styles.stepItem, idx === props.stepNum ? styles.active : null)}>
                                <span className={styles.stepItemTitle}>{item.title}</span>
                                <span className={styles.stepItemComment}>{item.comment}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default App;