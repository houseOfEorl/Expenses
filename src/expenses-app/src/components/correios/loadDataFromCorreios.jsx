import React, { Component } from 'react';
var { Modal, Button, Form, Checkbox } = require('semantic-ui-react')
var apiCaller = require('../../api/apiCaller');




class loadDataFromCorreios extends Component  {

    constructor(props) {
        super(props);

        this.state = {
            cep: "",
            resultText: ""
        }

        this.postSoapCorreios = this.postSoapCorreios.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        const value = event.target.value;
        const name = event.target.name;

        var partialState = {};
        partialState[name] = value;
        this.setState(partialState);
    }
    
    postSoapCorreios()
    {
        apiCaller.get("Correios", this.state.cep)
            .then(function(resp) {
                this.setState({resultText: resp.data});
            }.bind(this))
            .catch(function(error){
                console.log(error);
            })
    }    

    copyText()
    {
        apiCaller.get("Correios", "05043020")
            .then(function(resp) {
                this.setState({resultText: resp.data});
            }.bind(this))
            .catch(function(error){
                console.log(error);
            })
    }    

    render() {
    return (
        <div>
            <br/><br/>
            <input type="textbox" name="cep" value={this.state.cep} onChange={this.handleChange}></input>
            <input type="button" name="submit" value="Submit" onClick={this.postSoapCorreios}></input>
            <br/><br/><br/><br/>
            <textarea value={this.state.resultText} rows="20" cols="30"></textarea>
        </div>
    )}
}

export default loadDataFromCorreios;