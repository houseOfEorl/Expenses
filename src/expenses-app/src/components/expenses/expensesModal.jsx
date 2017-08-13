var React = require('react');
var ExpensesApi = require('../../api/expensesApi');
var Semantic = require('semantic-ui-react');



class expensesModal extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        ExpensesID: 0,
        Name: '',
        CountryID: '1',
        CreditOrDebit:'',
        ExpensesTypeID: 0,
        isCreditCard: false,
        ExpenseDate: '',
        isPaid: false,
        Amount: 0
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
    //define expense
    var expenseObject = this.state;

    //new record
    expenseObject.ExpensesID = 0;
    
    ExpensesApi.postExpenses(expenseObject)
        .then(data => {

          // this.setState({
          //   ExpensesID: id
          // })
          expenseObject.ExpensesID = data.id;

          this.props.action(expenseObject);
        }, (err) => {
          console.log("expensesModal: handleSubmit - error: ${err}");
        });

    // .then(resp => {  
    //   this.props.action(expenseObject);
    // });
  };
  
  render () {
    return (
      <Semantic.Modal trigger={<Semantic.Button>Add New Record</Semantic.Button>}>
        <Semantic.Modal.Header>Add/Edit Expense</Semantic.Modal.Header>
        <Semantic.Modal.Content scrolling>
            <Semantic.Form>
            <Semantic.Form.Field>
              <Semantic.Input label='Name' name='Name' onChange={this.handleChange} />
            </Semantic.Form.Field>
            <Semantic.Form.Field>
              <Semantic.Input label='CreditOrDebit' name='CreditOrDebit' onChange={this.handleChange} />
            </Semantic.Form.Field>
            <Semantic.Form.Field>
              <Semantic.Input label='ExpensesTypeID' name='ExpensesTypeID' onChange={this.handleChange} />
            </Semantic.Form.Field>
            <Semantic.Form.Field>
              <Semantic.Checkbox label='isCreditCard' name='isCreditCard' type='checkbox' onChange={this.handleChange} checked={this.state.expIsCreditCard}  />
            </Semantic.Form.Field>
            <Semantic.Form.Field>
              <Semantic.Input label='ExpenseDate' name='ExpenseDate' onChange={this.handleChange} />
            </Semantic.Form.Field>
            <Semantic.Form.Field>
              <Semantic.Checkbox label='isPaid' name='isPaid' type='checkbox' onChange={this.handleChange} checked={this.state.expIsPaid}  />
            </Semantic.Form.Field>
            <Semantic.Form.Field>
              <Semantic.Input label='Amount' name='Amount' onChange={this.handleChange} />
            </Semantic.Form.Field>
            <Semantic.Button onClick={this.handleSubmit} >Submit</Semantic.Button>
          </Semantic.Form>
        </Semantic.Modal.Content>
      </Semantic.Modal>
    )
  }
}


module.exports = expensesModal;