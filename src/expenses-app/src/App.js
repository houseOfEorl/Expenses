import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.css'
// import logo from './logo.svg';
import ExpensesPage from './components/expenses/expensesPage';
import SignIn from './components/login/signIn';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Semantic from 'semantic-ui-react';
import './Styles/utils/monthPicker.css';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        token: localStorage.ApiExpToken ? localStorage.ApiExpToken : ""
    }
  }

  render() {
    return (
    
      <div className="App">
        <div className="App-header"></div>
          <div>
            {localStorage.ApiExpToken ? <ExpensesPage /> : <SignIn />}
          </div> 
      </div>
    );
  }
}

export default App;
