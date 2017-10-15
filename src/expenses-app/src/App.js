import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.css'
// import logo from './logo.svg';
import ExpensesPage from './components/expenses/expensesPage';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Semantic from 'semantic-ui-react';
import './Styles/utils/monthPicker.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h4>Welcome

          </h4>
        </div>
        <div>
          <ExpensesPage />
        </div> 
      </div>
    );
  }
}

export default App;
