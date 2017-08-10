var React = require('react');
var ExpensesApi = require('../../api/expensesApi');
var Semantic = require('semantic-ui-react');


class expensesModal extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        expId: 1,
        expName: '',
        expCountryID: '1',
        expCreditOrDebit: '',
        expType: '',
        expIsCreditCard: false,
        expExpenseDate: '',
        expIsPaid: false,
        expAmount: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, data) {
    //const target = e.target;
    const value = data.type === 'checkbox' ? data.checked : data.value;
    const name = data.name;

    var partialState = {};
    partialState[name] = value;
    this.setState(partialState);
  };

  handleSubmit(e) {
    var expenseObject = new Object();
    //expenseObject.ExpensesID = this.state.expId;
    expenseObject.Name = this.state.expName;
    expenseObject.CreditOrDebit = this.state.expCreditOrDebit;
    expenseObject.isPaid = this.state.expIsPaid;
    expenseObject.Amount = this.state.expAmount;
    expenseObject.CountryID = this.state.expCountryID;
    expenseObject.isCreditCard = this.state.expIsCreditCard;
    expenseObject.ExpensesTypeID = this.state.expType;
    expenseObject.ExpenseDate = this.state.expExpenseDate;
    
    

    // ExpensesApi.postExpenses(expenseObject);

    ExpensesApi.postExpenses(expenseObject)
    .then(resp => {
        alert('a');
    });

    // alert(expenseObject.Name);
    // alert(expenseObject.Amount);
  };
  
  render () {
    return (
      <Semantic.Modal trigger={<Semantic.Button>Show Modal</Semantic.Button>}>
        <Semantic.Modal.Header>Add/Edit Expense</Semantic.Modal.Header>
        <Semantic.Modal.Content scrolling>
            <Semantic.Form>
            <Semantic.Form.Field>
              <Semantic.Input label='Name' name='expName' onChange={this.handleChange} />
            </Semantic.Form.Field>
            <Semantic.Form.Field>
              <Semantic.Input label='CreditOrDebit' name='expCreditOrDebit' onChange={this.handleChange} />
            </Semantic.Form.Field>
            <Semantic.Form.Field>
              <Semantic.Input label='Type' name='expType' onChange={this.handleChange} />
            </Semantic.Form.Field>
            <Semantic.Form.Field>
              <Semantic.Checkbox label='isCreditCard' name='expIsCreditCard' type='checkbox' onChange={this.handleChange} checked={this.state.expIsCreditCard}  />
            </Semantic.Form.Field>
            <Semantic.Form.Field>
              <Semantic.Input label='ExpenseDate' name='expExpenseDate' onChange={this.handleChange} />
            </Semantic.Form.Field>
            <Semantic.Form.Field>
              <Semantic.Checkbox label='isPaid' name='expIsPaid' type='checkbox' onChange={this.handleChange} checked={this.state.expIsPaid}  />
            </Semantic.Form.Field>
            <Semantic.Form.Field>
              <Semantic.Input label='Amount' name='expAmount' onChange={this.handleChange} />
            </Semantic.Form.Field>
            <Semantic.Button onClick={this.handleSubmit} >Submit</Semantic.Button>
          </Semantic.Form>
        </Semantic.Modal.Content>
      </Semantic.Modal>
    )
  }
}


module.exports = expensesModal;