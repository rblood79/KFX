
import './guideBox.scss';
import classNames from 'classnames';
import React, { useCallback } from 'react';

const App = (props) => {
    const Box = useCallback(() => {
        const result = [];
        for (let i = 0; i < 4; i++) {
            result.push(<span key={i} className={classNames('boxLine')} />)
        }
        return result;
    }, []);

    return (
        <div className={classNames('boxLineContainer')}>
            <Box />
        </div>
    );
}

export default App;