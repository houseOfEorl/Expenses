var React = require('react');
var { Table, Button, Icon, Label } = require('semantic-ui-react');
var ExpensesApi = require('../../api/apiCaller');
var ExpensesModal = require('./ExpensesModal')


class ExpensesList extends React.Component	{

    constructor (props)
    {
        super(props);
        this.handleOnClickDelete = this.handleOnClickDelete.bind(this);
        this.createExpenseRow = this.createExpenseRow.bind(this);
        this.state = {
            records: [],
            totalPerType: 0,
            total: 0
        };
    }


    handleOnClickDelete(expense) {
        
       this.props.handleDeleteRecord(expense);

    }

    componentDidUpdate(prevProps, prevState)
    {
        if(prevProps.expenses !== this.props.expenses)
        {
            var sum = 0;
            var sumPaid = 0;
            var len =  this.props.expenses.length;
            for(var i = 0; i < len; i++)
            {
                sum += parseFloat(this.props.expenses[i].Amount);
                if(this.props.expenses[i].isPaid){
                    sumPaid += parseFloat(this.props.expenses[i].Amount);
                    // console.log(sumPaid);
                }
            }

            this.props.setAccountant(sum, sumPaid, this.props.expenses[0].CreditOrDebit);

            this.setState({
                totalPerType: sum,
                total: this.total + sum,
                records: this.props.expenses
            });
        }
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
                <Table.Cell positive={expense.isPaid} negative={!expense.isPaid}>
                    {String(expense.isPaid)}
                </Table.Cell>
                <Table.Cell>{expense.Amount}</Table.Cell>
                <Table.Cell>
                    <ExpensesModal handleAddRecord={this.props.action} iconName={"edit"} size={"mini"} exp={expense} newRecord={false} />
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
                        <Table.Row >
                            <Table.Cell colSpan = '5'>
                                <b>Total:</b>
                            </Table.Cell>
                            <Table.Cell colSpan = '2'>
                                {this.state.totalPerType >= 0 &&
                                    <div className='green'><b>{this.state.totalPerType}</b></div>
                                }
                                {this.state.totalPerType < 0 &&
                                    <div className='red'><b>{this.state.totalPerType}</b></div>
                                }
                            </Table.Cell>
                        </Table.Row>
                    </Table.Footer>
				</Table>
			</div>
		);
	};
}
module.exports = ExpensesList;