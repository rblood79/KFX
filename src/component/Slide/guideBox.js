
import './guideBox.scss';
import classNames from 'classnames';

const App = (props) => {
    const active = props.active;
    const type = props.type;

    const Box = () => {
        const result = [];
        for (let i = 0; i < 4; i++) {
            result.push(<span key={i} className={classNames('boxLine')} />)
        }
        return result;
    }
    return (
        <div className={classNames('boxLineContainer', active && 'active')}>
            {type === 'list' && <Box />}
        </div>
    );
}

export default App;