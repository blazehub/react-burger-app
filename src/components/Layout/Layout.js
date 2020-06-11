import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    sideDrawClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    render() {
        return (<Aux>
            <div>
                <Toolbar />
                <SideDrawer open={this.state.showSideDrawer}
                    closed={this.sideDrawClosedHandler} />
                {/* Toolbar,SideDrawer,Backdrop */}
            </div>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>);
    }
}

export default Layout;