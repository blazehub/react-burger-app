import React, { Component } from 'react';

import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuthenticated={this.props.isAuthenticated} />
                <SideDrawer open={this.state.showSideDrawer}
                    isAuthenticated={this.props.isAuthenticated}
                    closed={this.sideDrawClosedHandler} />
                {/* Toolbar,SideDrawer,Backdrop */}
            </div>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>);
    }
}


const matStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(matStateToProps)(Layout);