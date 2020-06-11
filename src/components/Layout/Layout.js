import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => ({ showSideDrawer: !prevState.showSideDrawer }));
    }

    render() {
        return (<Aux>
            <div>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
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