import React, { Component } from 'react';

const UserContext = React.createContext();

class UserProvider extends Component {
    // Context state
    state = {
        url: 'http://localhost:8080',
        theme: 'light',
        topNum: null,
        type: 'list',
        focused: 0,
        base: false,
        count: 0,
        width: 0,
        height: 0,
        prev: null,
    };
    // Method to update state
    setTheme = async theme => {
        this.setState(
            {
                theme: theme ? 'dark' : 'light',
            }
        );
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
    setPrev = prev => {
        this.setState(prevState => ({ prev }));
    };
    //
    render() {
        const { children } = this.props;
        const { url, theme, topNum, type, focused, count, base, width, height, prev } = this.state;
        const { setTheme, setTopNum, setType, setFocused, setCount, setBase, setWidth, setHeight, setPrev } = this;

        return (
            <UserContext.Provider
                value={{
                    theme,
                    url,
                    topNum,
                    type,
                    focused,
                    count,
                    base,
                    width,
                    height,
                    prev,
                    setTheme,
                    setTopNum,
                    setType,
                    setFocused,
                    setCount,
                    setBase,
                    setWidth,
                    setHeight,
                    setPrev,
                }}>
                {children}
            </UserContext.Provider>
        );
    }
}

export default UserContext;

export { UserProvider };
