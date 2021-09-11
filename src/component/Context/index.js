import React, { Component } from 'react';

const UserContext = React.createContext();

class UserProvider extends Component {
    // Context state
    state = {
        url: 'http://localhost:8080',
        theme: 'light',
        topNum: 0,
        type: 'list',
        focused: 0,
        count: 0,
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
    setCount = value => {
        this.setState(prevState => ({ value }));
    };
    //
    render() {
        const { children } = this.props;
        const { url, theme, topNum, type, focused, count } = this.state;
        const { setTheme, setTopNum, setType, setFocused, setCount } = this;

        return (
            <UserContext.Provider
                value={{
                    theme,
                    url,
                    topNum,
                    type,
                    focused,
                    count,
                    setTheme,
                    setTopNum,
                    setType,
                    setFocused,
                    setCount,
                }}>
                {children}
            </UserContext.Provider>
        );
    }
}

export default UserContext;

export { UserProvider };
