"use strict";

var React = require('react');

class Home extends React.Component {
    render() {
        return (
                <div className="jumbotron">
                    <h1>Expenses</h1>
                    <p>Testing React</p>
                </div>
            );
    }
} 

module.exports = Home;