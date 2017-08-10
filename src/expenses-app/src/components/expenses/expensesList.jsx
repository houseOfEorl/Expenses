var React = require('react');
var Semantic = require('semantic-ui-react');



class ExpensesList extends React.Component	{

    constructor (props)
    {
        super(props);
        this.handleOnClickEdit = this.handleOnClickEdit.bind(this);
    }

    handleOnClickEdit(expense) {
        alert(expense.ExpensesID);
    }
    
	render () {

        //console.log(expense);
        //console.log(expense.id);

        var createExpenseRow = function (expense) {
            //console.log(expense);
			return (

                <Semantic.Table.Row key={expense.ExpensesID}>
                    {/* <Semantic.Table.Cell>{expense.ExpensesID}</Semantic.Table.Cell> */}
                    <Semantic.Table.Cell>{expense.Name}</Semantic.Table.Cell>
                    <Semantic.Table.Cell>{expense.CreditOrDebit}</Semantic.Table.Cell>
                    <Semantic.Table.Cell>{expense.Type.Description}</Semantic.Table.Cell>
                    <Semantic.Table.Cell>{String(expense.isCreditCard)}</Semantic.Table.Cell>
                    <Semantic.Table.Cell>{expense.ExpenseDate.split('T')[0]}</Semantic.Table.Cell>
                    <Semantic.Table.Cell>{String(expense.isPaid)}</Semantic.Table.Cell>
                    <Semantic.Table.Cell>{expense.Amount}</Semantic.Table.Cell>
                    <Semantic.Table.Cell>
                        <Semantic.Button onClick={() => this.handleOnClickEdit(expense)} icon ><Semantic.Icon name={'edit'}  /></Semantic.Button>
                        <Semantic.Icon name={'trash outline'} />
                    </Semantic.Table.Cell>
                </Semantic.Table.Row>
			);
		};

		return (
            
			<div>
				<Semantic.Table sortable celled fixed>
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
                        {this.props.expenses.map(createExpenseRow, this)}
                    </Semantic.Table.Body>
				</Semantic.Table>
			</div>
		);
	};
}
module.exports = ExpensesList;