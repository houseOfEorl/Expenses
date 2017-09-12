var React = require('react');
var ExpensesApi = require('../../api/expensesApi');
var ExpensesList = require('./expensesList');
var Semantic = require('semantic-ui-react');
var ExpensesModal = require('./expensesModal')

const options = [
  { key: 1, text: 'All', value: 1 },
  { key: 2, text: 'Paid', value: 2 },
  { key: 3, text: 'Not Paid', value: 3 },
]


class ExpensesPage extends React.Component{

	constructor(props) {
		super(props);
		this.state = { 
            expensesCredit: [],
            expensesDebit: [],
            //period: new Date(Date.now()).toLocaleString()
            period: "2017-08"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePeriod = this.handleChangePeriod.bind(this);
        this.handleAddRecord = this.handleAddRecord.bind(this);
    }

    filter(arr, criteria) {
        return arr.filter(function(obj) {
            return Object.keys(criteria).every(function(c) {
            return obj[c] === criteria[c];
            });
        });
    };

    getCredit(value) {
        this.setState({
            expensesCredit: this.filter(value, { CreditOrDebit: 'C ' })
        })
    };

    getDebit(value) {
        //console.log(value);
        this.setState({
            expensesDebit: this.filter(value, { CreditOrDebit: 'D ' })
        })
    };


	componentDidMount() {
        ExpensesApi.getGithubInfo(this.state.period)
            .then(function (data) {
                this.getCredit(data.repos);
                this.getDebit(data.repos);
                // this.setState({
                //     expenses: data.repos
                // })
            }.bind(this));
    };

    handleSubmit(e) {
        e.preventDefault();
        // console.log(this.state.period);
        ExpensesApi.getGithubInfo(this.state.period)
            .then(resp => {
                this.getCredit(resp.repos);
                this.getDebit(resp.repos);
            });
    };

    handleChangePeriod(e) {
        this.setState({
            period: e.target.value
        });
    };

    handleAddRecord(expense) {
        
        var expenses = this.state.expensesCredit;

        expenses.push(expense);

        this.setState({
            expensesCredit: expenses
        });

        // console.log(foo);
    };

	render() {
		return (
			<div>
                <h1>Expenses</h1>

                <Semantic.Menu attached='top'>
                    <Semantic.Menu.Item>
                        <Semantic.Input placeholder="Date" onChange={this.handleChangePeriod} />
                    </Semantic.Menu.Item> 
                    <Semantic.Menu.Item>
                        <Semantic.Label size={'mini'}><Semantic.Icon name='dollar'/></Semantic.Label>
                        <Semantic.Dropdown additionLabel={'Test:'} defaultValue={1}  options={options}/>
                    </Semantic.Menu.Item>    
                    <Semantic.Menu.Item>
                        <Semantic.Button onClick={this.handleSubmit}>Search</Semantic.Button>
                    </Semantic.Menu.Item>    
                </Semantic.Menu>
                <Semantic.Segment attached='bottom'>
                    <ExpensesModal action={this.handleAddRecord} buttonName={"Add New Record"} />
                    <ExpensesList expenses={this.state.expensesCredit} />
                    <ExpensesList expenses={this.state.expensesDebit} />
                </Semantic.Segment>
			</div>
		);
	};
}

module.exports = ExpensesPage;