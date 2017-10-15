﻿var React = require('react');
var ExpensesApi = require('../../api/expensesApi');
var ExpensesList = require('./expensesList');
var Semantic = require('semantic-ui-react');
var ExpensesModal = require('./expensesModal')
var MonthPicker = require('../utils/monthPicker');

const options = [
  { key: 1, text: 'All', value: 1 },
  { key: 2, text: 'Paid', value: 2 },
  { key: 3, text: 'Not Paid', value: 3 },
]


class ExpensesPage extends React.Component{

	constructor(props) {
        super(props);
        
        var currentTime = new Date()
        var dt = currentTime.getFullYear() + "-" + (currentTime.getMonth() + 1)

		this.state = { 
            expensesCredit: [],
            expensesDebit: [],
            expensesOriginalCredit: [],
            expensesOriginalDebit: [],
            period: dt,
            paymentOption: 1
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePeriod = this.handleChangePeriod.bind(this);
        this.handleAddRecord = this.handleAddRecord.bind(this);
        this.handleChangePaymentOption = this.handleChangePaymentOption.bind(this);
    };

    filter(arr, criteria) {
        // console.log(arr);
        // return arr;
        return arr.filter(function(obj) {
            return Object.keys(criteria).every(function(c) {
            return obj[c] === criteria[c];
            });
        });
    };

    getData(value) {
        // console.log(this.state.paymentOption);

        if(this.state.paymentOption !== 1) {

            var _isPaid = true;

            if(this.state.paymentOption == 3) {
                _isPaid = false
            }
            value = this.filter(value, {isPaid: _isPaid})
            // console.log(value);
        }

        return value;
    };

    getCredit(value) {

        var filterData = this.getData(value);

        this.setState({
            expensesCredit: this.filter(filterData, { CreditOrDebit: 'C' })
        });


    };

    getDebit(value) {
        //console.log(value);

        var filterData = this.getData(value);

        this.setState({
            expensesDebit: this.filter(filterData, { CreditOrDebit: 'D' })
        })
    };


	componentDidMount() {
        ExpensesApi.getExpenses(this.state.period)
            .then(function (data) {
                this.getCredit(data.repos);
                this.getDebit(data.repos);
                // this.setState({
                //     expenses: data.repos
                // })
            }.bind(this));
    };

    handleSubmit(e) {
        //e.preventDefault();
        // console.log(this.state.period);
        ExpensesApi.getExpenses(this.state.period)
            .then(resp => {
                this.getCredit(resp.repos);
                this.getDebit(resp.repos);

                this.setState({
                    expensesOriginalCredit: this.expensesCredit,
                    expensesOriginalDebit: this.expensesDebit
                })

            });
    };

    handleChangePeriod(e) {
        this.setState({
            period: e.target.value
        });
    };

    handleChangePaymentOption(e, data) {
        this.setState({
            paymentOption: data.value
        });
    };

    handleAddRecord(expense) {
        
        if(expense.CreditOrDebit === "C") {
            var expenses = this.state.expensesCredit;
            
            expenses.push(expense);
            
            this.setState({
                expensesCredit: expenses
            });
        }
        else {
            var expenses = this.state.expensesDebit;

            expenses.push(expense);
            
            this.setState({
                expensesDebit: expenses
            });
        }
        // console.log(foo);
    };

	render() {
		return (
			<div>
                <h1>Expenses</h1>
                
                <Semantic.Menu attached='top'>
                    <Semantic.Menu.Item>
                        <div id="page-container"></div>
                    </Semantic.Menu.Item> 
                    <Semantic.Menu.Item>
                        <Semantic.Dropdown additionLabel={'Test:'} defaultValue={1}  options={options} onChange={this.handleChangePaymentOption}/>
                    </Semantic.Menu.Item>    
                    <Semantic.Menu.Item>
                        <Semantic.Button onClick={this.handleSubmit}>Search</Semantic.Button>
                    </Semantic.Menu.Item>
                    <Semantic.Menu.Item position='right'>
                        <ExpensesModal action={this.handleAddRecord} iconName={"edit"} buttonName={"Add New Record"} />
                    </Semantic.Menu.Item>
                </Semantic.Menu>
                <Semantic.Segment attached='bottom'>
                    <ExpensesList expenses={this.state.expensesCredit} action={this.handleSubmit} /><br/>
                    <ExpensesList expenses={this.state.expensesDebit} action={this.handleSubmit} />
                </Semantic.Segment>
			</div>
		);
	};
}

module.exports = ExpensesPage;