var React = require('react');
var Semantic = require('semantic-ui-react');
var ExpensesApi = require('../../api/expensesApi');
var ExpensesModal = require('./expensesModal')


class ExpensesList extends React.Component	{

    constructor (props)
    {
        super(props);
        this.handleOnClickEdit = this.handleOnClickEdit.bind(this);
        this.createExpenseRow = this.createExpenseRow.bind(this);
        this.state = {
            records: []
        };
    }

    handleOnClickEdit(expense) {

        <ExpensesModal action={this.handleAddRecord} />

        // alert(expense.ExpensesID);
    }

    handleOnClickDelete(expense) {
        
       ExpensesApi.removeExpenses(expense);

       var recordsNotDeleted = this.state.records.filter(x => x.ExpensesID !== expense.ExpensesID);
       console.log(recordsNotDeleted);
       this.setState({
           records: recordsNotDeleted
       })
    }

    // componentDidMount()
    // {
    //     this.setState({
    //         records: this.props.expenses
    //     });

    //     console.log("componentWillReceiveProps")
    // }

    // componentWillReceiveProps(nextProps)
    // {
    //     console.log("componentWillReceiveProps")
    // }

    // componentWillUpdate(nextProps, nextState)
    // {
    //     console.log("componentWillUpdate")
    // }

    componentDidUpdate(prevProps, prevState)
    {
        if(prevProps.expenses !== this.props.expenses)
        {
            this.setState({
                records: this.props.expenses
            });
        }
        // else if(prevProps.expenses !== prevState.records)
        // {
        //     this.setState({
        //         records: this.props.expenses
        //     });
        // }

        // console.log("componentWillUpdate")
    }

    createExpenseRow = function (expense) {
        // console.log(this.props.action);
        return (

            <Semantic.Table.Row key={expense.ExpensesID} >
                {/* <Semantic.Table.Cell>{expense.ExpensesID}</Semantic.Table.Cell> */}
                <Semantic.Table.Cell>{expense.Name}</Semantic.Table.Cell>
                <Semantic.Table.Cell>{expense.CreditOrDebit}</Semantic.Table.Cell>
                <Semantic.Table.Cell>{expense.ExpensesTypeID}</Semantic.Table.Cell>
                <Semantic.Table.Cell>{String(expense.isCreditCard)}</Semantic.Table.Cell>
                <Semantic.Table.Cell>{expense.ExpenseDate.split('T')[0]}</Semantic.Table.Cell>
                <Semantic.Table.Cell>{String(expense.isPaid)}</Semantic.Table.Cell>
                <Semantic.Table.Cell>{expense.Amount}</Semantic.Table.Cell>
                <Semantic.Table.Cell>
                    <ExpensesModal action={this.props.action} iconName={"edit"} size={"mini"} exp={expense} />
                    <Semantic.Button onClick={() => this.handleOnClickDelete(expense)} icon ><Semantic.Icon name={'trash outline'}  /></Semantic.Button>
                </Semantic.Table.Cell>
            </Semantic.Table.Row>
        );
    };
    
	render () {

        //console.log(expense);
        //console.log(expense.id);
        var expComponents = this.state.records.map(this.createExpenseRow, this)


		return (
            
			<div>
				<Semantic.Table sortable celled fixed size={"small"} compact={"true"}>
                    <Semantic.Table.Header>
                        <Semantic.Table.Row>
                            {/* <Semantic.Table.HeaderCell >
                                ID
                            </Semantic.Table.HeaderCell> */}
                            <Semantic.Table.HeaderCell >
                                Name
                            </Semantic.Table.HeaderCell>
                            <Semantic.Table.HeaderCell >
                                CreditOrDebit
                            </Semantic.Table.HeaderCell>
                            <Semantic.Table.HeaderCell >
                                Type
                            </Semantic.Table.HeaderCell>
                            <Semantic.Table.HeaderCell >
                                isCreditCard
                            </Semantic.Table.HeaderCell>
                            <Semantic.Table.HeaderCell >
                                ExpenseDate
                            </Semantic.Table.HeaderCell>
                            <Semantic.Table.HeaderCell >
                                isPaid
                            </Semantic.Table.HeaderCell>
                            <Semantic.Table.HeaderCell >
                                Amount
                            </Semantic.Table.HeaderCell>
                        </Semantic.Table.Row>
                    </Semantic.Table.Header>
                    <Semantic.Table.Body>
                        {
                            expComponents
                        }
                    </Semantic.Table.Body>
				</Semantic.Table>
			</div>
		);
	};
}
module.exports = ExpensesList;