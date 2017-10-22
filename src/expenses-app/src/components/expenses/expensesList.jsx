var React = require('react');
var { Table, Button, Icon, Label } = require('semantic-ui-react');
var ExpensesApi = require('../../api/expensesApi');
var ExpensesModal = require('./expensesModal')


class ExpensesList extends React.Component	{

    constructor (props)
    {
        super(props);
        this.handleOnClickEdit = this.handleOnClickEdit.bind(this);
        this.createExpenseRow = this.createExpenseRow.bind(this);
        this.state = {
            records: [],
            total: 0
        };
    }

    handleOnClickEdit(expense) {
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
            var sum = 0;
            var len =  this.props.expenses.length;
            for(var i = 0; i < len; i++)
            {
                sum += this.props.expenses[i].Amount;
            }

            this.setState({
                total: sum.toFixed(2),
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

            <Table.Row key={expense.ExpensesID} >
                {/* <Table.Cell>{expense.ExpensesID}</Table.Cell> */}
                <Table.Cell>{expense.Name}</Table.Cell>
                <Table.Cell>{expense.CreditOrDebit}</Table.Cell>
                {/* <Table.Cell>{expense.ExpensesTypeID}</Table.Cell> */}
                <Table.Cell>{String(expense.isCreditCard)}</Table.Cell>
                <Table.Cell>{expense.ExpenseDate.split('T')[0]}</Table.Cell>
                <Table.Cell>{String(expense.isPaid)}</Table.Cell>
                <Table.Cell>{expense.Amount}</Table.Cell>
                <Table.Cell>
                    <ExpensesModal action={this.props.action} iconName={"edit"} size={"mini"} exp={expense} />
                    <Button onClick={() => this.handleOnClickDelete(expense)} icon ><Icon name={'trash outline'}  /></Button>
                </Table.Cell>
            </Table.Row>
        );
    };
    
	render () {

        //console.log(expense);
        //console.log(expense.id);
        var expComponents = this.state.records.map(this.createExpenseRow, this)


		return (
            
			<div>
				<Table sortable celled fixed size={"small"} compact={"true"}>
                    <Table.Header>
                        <Table.Row>
                            {/* <Table.HeaderCell >
                                ID
                            </Table.HeaderCell> */}
                            <Table.HeaderCell >
                                Name
                            </Table.HeaderCell>
                            <Table.HeaderCell >
                                CreditOrDebit
                            </Table.HeaderCell>
                            {/* <Table.HeaderCell >
                                Type
                            </Table.HeaderCell> */}
                            <Table.HeaderCell >
                                isCreditCard
                            </Table.HeaderCell>
                            <Table.HeaderCell >
                                ExpenseDate
                            </Table.HeaderCell>
                            <Table.HeaderCell >
                                isPaid
                            </Table.HeaderCell>
                            <Table.HeaderCell >
                                Amount
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            expComponents
                        }
                    </Table.Body>
                    <Table.Footer fullWidth >
                        <Table.Row positive>
                            <Table.Cell colSpan = '5'>
                                <b>Total:</b>
                            </Table.Cell>
                            <Table.Cell colSpan = '2'>
                                <b>{this.state.total}</b>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Footer>
				</Table>
			</div>
		);
	};
}
module.exports = ExpensesList;