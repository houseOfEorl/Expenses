import MonthPicker from '../utils/monthPicker';
var React = require('react');
var ExpensesApi = require('../../api/apiCaller');
var ExpensesList = require('./ExpensesList');
var { Menu, Dropdown, Segment, Button, Icon } = require('semantic-ui-react')
var ExpensesModal = require('./ExpensesModal');

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
            paymentOption: 1,
            accountantCredit: 0,
            accountantCreditPaid: 0,
            accountantDebit: 0,
            accountantDebitPaid: 0
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePeriod = this.handleChangePeriod.bind(this);
        this.handleAddRecord = this.handleAddRecord.bind(this);
        this.handleDeleteRecord = this.handleDeleteRecord.bind(this);
        this.handleChangePaymentOption = this.handleChangePaymentOption.bind(this);
        this.setAccountant = this.setAccountant.bind(this);
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
        this.handleSubmit("")
        // ExpensesApi.getWithToken("Expenses", this.state.period)
        //     .then(function (resp) {
        //         this.getCredit(resp.data);
        //         this.getDebit(resp.data);
        //         // this.setState({
        //         //     expenses: data.repos
        //         // })
        //     }.bind(this))
        //     .catch(function (error) {
        //         console.log("error")
        //     });
    };
    
    handleSubmit(e) {
        //e.preventDefault();
        // console.log(this.state.period);
        this.setState({accountantCredit: 0, accountantCreditPaid:0, accountantDebit: 0, accountantDebitPaid:0})
        this.props.onSecureClick(this.state.period)
            .then(function (resp) {
                this.getCredit(JSON.parse(resp));
                this.getDebit(JSON.parse(resp));
                // this.setState({
                //     expenses: data.repos
                // })
            }.bind(this))
            .catch(function (error) {
                console.log(error)
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

        this.handleSubmit(null)

        // if(expense.CreditOrDebit === "C") {
        //     var newStateArray = this.state.expensesCredit.slice();
        //     newStateArray.push(expense);
            
        //     this.setState({
        //         expensesCredit: newStateArray
        //     });
        // }
        // else {
        //     var newStateArray = this.state.expensesDebit.slice();
        //     newStateArray.push(expense);
            
        //     this.setState({
        //         expensesDebit: newStateArray
        //     });

        // }
        // console.log(foo);
    };

    handleDeleteRecord(expense) {
        
        ExpensesApi.deleteWithToken("Expenses", expense);

        if(expense.CreditOrDebit === "C") {
            var newStateArray = this.state.expensesCredit.filter(x => x.ExpensesID !== expense.ExpensesID);
            
            this.setState({
                expensesCredit: newStateArray
            });
        }
        else {
            var newStateArray = this.state.expensesDebit.filter(x => x.ExpensesID !== expense.ExpensesID);
            
            this.setState({
                expensesDebit: newStateArray
            });

        }
    };

    setAccountant(value, valuePaid, isCreditOrDebit) {
        if(isCreditOrDebit == "C")
        {
            this.setState({
                accountantCredit: parseFloat(value),
                accountantCreditPaid: parseFloat(valuePaid)
            })
        }
        else
        {
            this.setState({
                accountantDebit: this.state.accountantDebit + parseFloat(value),
                accountantDebitPaid: this.state.accountantDebitPaid + parseFloat(valuePaid)
            })
        }
        // this.setState(prevState => ({
        //     accountant: prevState.accountant + parseFloat(value)
        // }));
    }

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
                        <Icon name={"add user"}/> <ExpensesModal handleAddRecord={this.handleAddRecord} iconName={"edit"} buttonName={"Add New Record"} newRecord={true} />
                    </Menu.Item>
                </Menu>
                <Segment attached='bottom'> 
                    {this.state.accountantCredit >= 0 &&
                        <div className='green'><b>Total: { (this.state.accountantCredit + this.state.accountantDebit).toFixed(2) }</b></div>
                    }
                    {this.state.accountantCredit < 0 &&
                        <div className='red'><b>Total: {(this.state.accountantCredit + this.state.accountantDebit).toFixed(2)}</b></div>
                    }

                    {this.state.accountantCreditPaid >= 0 &&
                        <div className='green'><b>Total Paid: {(this.state.accountantCreditPaid + this.state.accountantDebitPaid).toFixed(2) }</b></div>
                    }
                    {this.state.accountantCreditPaid < 0 &&
                        <div className='red'><b>Total Paid: {(this.state.accountantCreditPaid + this.state.accountantDebitPaid).toFixed(2)}</b></div>
                    }

                    <ExpensesList expenses={this.state.expensesCredit} action={this.handleSubmit} setAccountant={this.setAccountant} handleDeleteRecord={this.handleDeleteRecord} /><br/>
                    <ExpensesList expenses={this.state.expensesDebit} action={this.handleSubmit} setAccountant={this.setAccountant} handleDeleteRecord={this.handleDeleteRecord} />
                </Segment>
			</div>
		);
	};
}

export default ExpensesPage;