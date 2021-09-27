import './aircraft.scss';
import React, { useEffect, useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import context from '../Context';

const App = (props) => {
    const state = useContext(context);
    const { engine } = state;
    //const images = props.images;
    const prop = useSpring(
        {
            config: { duration: 420 },
            x: props.active
        }
    )
    useEffect(() => {
    }, [])
    return (
        <div className="imageContainer" >
            {engine ? (
                <animated.img className={'image'} alt={'KF21'}
                    src={prop.x.to({ range: [0, 1], output: [60, 40] }).to(num => process.env.PUBLIC_URL + '/assets/aircraft/FA50/FA_00' + Math.round(num))}
                    //src={prop.x.to({ range: [0, 1], output: [images.length - 1, 0] }).to(num => images[Math.round(num)].src)}
                    style={{
                        transform: prop.x.to({ range: [0, 0.5, 1], output: [1, 1, 2.8] }).to(x => `scale(${x})`),
                        marginTop: prop.x.to({ range: [0, 0.5, 1], output: [0, 0, -42] }).to(x => x)
                    }}
                />) : (
                <animated.img className={'image'} alt={'KF21'}
                    src={process.env.PUBLIC_URL + '/assets/aircraft/FA50/FA_0060'}
                    //src={images[Math.round(images.length - 1)].src}
                    style={{
                        transform: prop.x.to({ range: [0, 0.5, 1], output: [1, 1, 1.4] }).to(x => `scale(${x})`),
                    }}
                />
            )}


        </div>
    );
}

App.defaultProps = {
    test: 1,
};

export default App;
