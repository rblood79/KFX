import React, { Component } from 'react';

const UserContext = React.createContext();

class UserProvider extends Component {
    // Context state
    state = {
        url: 'http://localhost:8080',
        theme: 'light',
        topNum: 0,
        topNav: null,
        type: 'list',
        focused: 0,
        base: false,
        count: 0,
        width: 0,
        height: 0,
        filter: null,
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
    setTopNav = topNav => {
        this.setState(prevState => ({ topNav }));
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
    //
    render() {
        const { children } = this.props;
        const { url, theme, topNum, topNav, type, focused, count, base, width, height, filter } = this.state;
        const { setTheme, setTopNum, setTopNav, setType, setFocused, setCount, setBase, setWidth, setHeight, setFilter } = this;

        return (
            <UserContext.Provider
                value={{
                    theme,
                    url,
                    topNum,
                    topNav,
                    type,
                    focused,
                    count,
                    base,
                    width,
                    height,
                    filter,
                    setTheme,
                    setTopNum,
                    setTopNav,
                    setType,
                    setFocused,
                    setCount,
                    setBase,
                    setWidth,
                    setHeight,
                    setFilter,
                }}>
                {children}
            </UserContext.Provider>
        );
    }
}

export default UserContext;

export { UserProvider };
