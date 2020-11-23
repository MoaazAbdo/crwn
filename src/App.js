import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super()
  
    this.state = {
       currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {

    /**
     * onAuthStateChanged(). it is a message system between application and firebase.
     * whenever anychanges occurs on firebase from any source related to this application
     * firebase sends out that message that says state changed the user has updated.
     * and this connection is always open as long as our application component is mounted.
     * because it'a an open subscrition we also have to close subscription when this unmount because we don't 
     * any memory leak in our javascript application . 
     */
      

    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }
  
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
              
        <Switch>
  
          <Route exact  path="/" component={HomePage}></Route>
          <Route path="/shop" component={ShopPage}></Route>
          <Route path="/signin" component={SignInSignUpPage}></Route>
  
        </Switch>
  
      </div>
    );
  }
  
}

export default App;
