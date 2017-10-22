import MonthPicker from '../utils/monthPicker';
var React = require('react');
var ExpensesApi = require('../../api/expensesApi');
var ExpensesList = require('./expensesList');
var { Menu, Dropdown, Segment, Button, Icon } = require('semantic-ui-react')
var ExpensesModal = require('./expensesModal');

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

            if(this.state.paymentOption === 3) {
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

            });
    };

    handleChangePeriod(data) {

        this.setState({
            period: data.year + '-' + data.month
        });
    };

    handleChangePaymentOption(e, data) {
        this.setState({
            paymentOption: data.value
        });
    };

    handleAddRecord(expense) {
        
        var expenses = "";

        if(expense.CreditOrDebit === "C") {
            expenses = this.state.expensesCredit;
            
            expenses.push(expense);
            
            this.setState({
                expensesCredit: expenses
            });
        }
        else {
            expenses = this.state.expensesDebit;

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
                <Menu attached='top'>
                    <Menu.Item>
                        <Icon name={"calendar"}/> <MonthPicker actionChangePeriod={this.handleChangePeriod} />
                    </Menu.Item> 
                    <Menu.Item>
                        <Icon name={"dollar"}/> <Dropdown additionLabel={'Test:'} defaultValue={1}  options={options} onChange={this.handleChangePaymentOption}/>
                    </Menu.Item>    
                    <Menu.Item>
                        <Button onClick={this.handleSubmit}>Search</Button>
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Icon name={"add user"}/> <ExpensesModal action={this.handleAddRecord} iconName={"edit"} buttonName={"Add New Record"} />
                    </Menu.Item>
                </Menu>
                <Segment attached='bottom'>
                    <ExpensesList expenses={this.state.expensesCredit} action={this.handleSubmit} /><br/>
                    <ExpensesList expenses={this.state.expensesDebit} action={this.handleSubmit} />
                </Segment>
			</div>
		);
	};
}

export default ExpensesPage;