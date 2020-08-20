import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';

import * as actions from './store/actions';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = (
      <>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/" />
      </>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Redirect to="/" />
        </>
      )
    }

    return (
      <div>
        <Layout>
          <Switch>

            {routes}

          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
