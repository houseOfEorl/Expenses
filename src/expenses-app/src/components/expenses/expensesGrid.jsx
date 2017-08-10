/*import React, { Component } from 'react';
import GitHub from '../API/expenses.jsx';

class expensesGrid extends Component {
  render() {
    return (
      <div className="App">
        <GitHub username="jackfranklin"></GitHub>
      </div>
    );

  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default expensesGrid;*/

var React = require('react');
var ReactDOM = require('react-dom');
import GitHub from '../API/expenses.jsx'


function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    <GitHub username="houseOfEorl"></GitHub>
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
