import React, { Component } from 'react';
import ExpensesPage from '../components/expenses/ExpensesPage'
import SignIn from '../components/login/SignIn';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
// import Semantic from 'semantic-ui-react';
import '../Styles/utils/monthPicker.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from '../components/home/homePage';
import Correios from '../components/correios/loadDataFromCorreios';
import Header from '../components/common/header'
import { connect } from 'react-redux'
import { loginUser, logoutUser, fetchSecureExpense } from '../actions'

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, quote, isAuthenticated, errorMessage, isSecretQuote } = this.props
    return (
      <Router>
        <div>
          <Header  isAuthenticated={isAuthenticated} />
          <Route exact path="/" component={HomePage} />
          <Route path="/signin" component={() => <SignIn onLoginClick={ creds => dispatch(loginUser(creds))} isAuthenticated={isAuthenticated} />}  />
          {/* <Route path="/signin" component={() => <SignIn />}  /> */}
          { isAuthenticated &&
            <Route path="/expenses" component={() => <ExpensesPage onSecureClick={ period => dispatch(fetchSecureExpense(period))} isAuthenticated={isAuthenticated} />}  />
          }
          { !isAuthenticated &&
            <Route path="/expenses" component={() => <SignIn onLoginClick={ creds => dispatch(loginUser(creds))} isAuthenticated={isAuthenticated} />}  />
          }
          <Route path="/correios" component={Correios} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  
  const { quotes, auth } = state
  const { quote, authenticated } = quotes
  const { isAuthenticated, errorMessage } = auth
  
  return {
    quote,
    isSecretQuote: authenticated,
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App)
