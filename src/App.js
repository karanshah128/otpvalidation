
import React, { Component } from 'react';
import PrivateRoutes from './PrivateRoutes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BackgroundLoader from './BackgroundLoader';
import ErrorBoundary from './ErrorBoundary';
import { StateProvider } from './Context';
import Login from "./Component/Login"
import EntryMode from "./Component/EntryMode"
import Logout from "./Component/Logout"




class App extends Component {

  componentDidCatch(err) {

    this.props.history.push({
      pathname: '/',
    });
  }

  render() {
    return (

        <React.Suspense fallback={<BackgroundLoader />}>
          <StateProvider>
            <BrowserRouter >
              <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoutes>
                  <Switch>
                    <Route exact path="/EntryMode" component={EntryMode} />
                    <Route exact path="/Logout" component={Logout} />
                  </Switch>
                </PrivateRoutes>


              </Switch>
            </BrowserRouter>
          </StateProvider>
        </React.Suspense>






    );
  }
}

export default App;