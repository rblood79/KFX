import React, { Component } from 'react';

const UserContext = React.createContext();

class UserProvider extends Component {
    // Context state
    state = {
        type: 'list',
        engine: true,
        base: false,
        filter: null,
        topNum: 0,
        focused: 0,
        count: 0,
        width: 0,
        height: 0,
        size: 340,
        temp: [0,0,0,0,0],
    };
    // Method to update state
    setTheme = async theme => {
        this.setState(
            {
                theme: theme ? 'dark' : 'light',
            }
        );
    };
    setEngine = engine => {
        this.setState(prevState => ({ engine }));
    };
    setTopNum = topNum => {
        this.setState(prevState => ({ topNum }));
    };
    setType = type => {
        this.setState(prevState => ({ type }));
    };
    setFocused = focused => {
        this.setState(prevState => ({ focused }));
    };
    setBase = base => {
        this.setState(prevState => ({ base }));
    };
    setCount = count => {
        this.setState(prevState => ({ count }));
    };
    setWidth = width => {
        this.setState(prevState => ({ width }));
    };
    setHeight = height => {
        this.setState(prevState => ({ height }));
    };
    setFilter = filter => {
        this.setState(prevState => ({ filter }));
    };
    setTemp = temp => {
        this.setState(prevState => ({ temp }));
    };
    //
    render() {
        const { children } = this.props;
        const { url, theme, engine, topNum, type, focused, count, base, width, height, size, filter, temp } = this.state;
        const { setTheme, setEngine, setTopNum, setType, setFocused, setCount, setBase, setWidth, setHeight, setFilter, setTemp } = this;

        return (
            <UserContext.Provider
                value={{
                    theme,
                    url,
                    engine,
                    topNum,
                    type,
                    focused,
                    count,
                    base,
                    width,
                    height,
                    size,
                    filter,
                    temp,
                    setTheme,
                    setEngine,
                    setTopNum,
                    setType,
                    setFocused,
                    setCount,
                    setBase,
                    setWidth,
                    setHeight,
                    setFilter,
                    setTemp,
                }}>
                {children}
            </UserContext.Provider>
        );
    }
}

export default UserContext;

export { UserProvider };
