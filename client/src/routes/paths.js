import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../components/login';

class Paths extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <LoginPage></LoginPage>
                </Switch>
            </div>
        )
    }
}
export default Paths