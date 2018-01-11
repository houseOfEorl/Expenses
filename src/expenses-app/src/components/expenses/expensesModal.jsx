var React = require('react');
var ExpensesApi = require('../../api/apiCaller');
var { Modal, Button, Form, Checkbox } = require('semantic-ui-react')


const optionCreditOrDebit = [
  { key:"C", text:"Credit", value: "C"},
  { key:"D", text:"Debit", value:"D"}
]

const optionPaymentType = [
  {key:1, text: "Basic",  value: 1},
  {key:2, text: "Investment", value: 2},
  {key:3, text: "Credit card", value: 3},
  {key:4, text: "Leisure", value: 4},
  {key:5, text: "Grocery", value: 5},
  {key:6, text: "Others", value: 6},
  {key:7, text: "Restaurant", value: 7},
  {key:9, text: "Pets", value: 9},
  {key:10, text: "Health", value: 10}
]

class expensesModal extends React.Component {

  constructor(props) {
      super(props);

      this.state = { modalOpen: false }

      //alert(this.props.exp)
      if ((this.props.exp !== undefined))
      {
        this.state = {
          ExpensesID: this.props.exp.ExpensesID,
          Name: this.props.exp.Name,
          CountryID: this.props.exp.CountryID,
          CreditOrDebit:this.props.exp.CreditOrDebit,
          ExpensesTypeID: this.props.exp.ExpensesTypeID,
          isCreditCard: this.props.exp.isCreditCard,
          ExpenseDate: this.props.exp.ExpenseDate,
          isPaid: this.props.exp.isPaid,
          Amount: this.props.exp.Amount
        }
      }
      else
      {
        this.state = {
          ExpensesID: 0,
          Name: "",
          CountryID: '1',
          CreditOrDebit:'',
          ExpensesTypeID: 0,
          isCreditCard: false,
          ExpenseDate: '',
          isPaid: false,
          Amount: 0
        }
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleOpen = this.handleOpen.bind(this);
      this.handleClose= this.handleClose.bind(this);
  }

  handleOpen () 
  { 
    if(this.props.newRecord) 
    {
      this.setState({           
        ExpensesID: 0,
        Name: "",
        CountryID: '1',
        CreditOrDebit:'',
        ExpensesTypeID: 0,
        isCreditCard: false,
        ExpenseDate: '',
        isPaid: false,
        Amount: 0
      })
    }

    this.setState({modalOpen: true })

  }

  handleClose () 
  { 
    this.setState({modalOpen: false })
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

    if (expenseObject.ExpensesID !== 0)
    {
      ExpensesApi.putExpenses(expenseObject)
      .then(data => {

        // this.setState({
        //   ExpensesID: id
        // })
        this.props.handleAddRecord(expenseObject);
      }, (err) => {
        console.log("expensesModal: handleSubmit - error: ${err}");
      });

    }
    else {
      ExpensesApi.postExpenses(expenseObject)
          .then(data => {

            // this.setState({
            //   ExpensesID: id
            // })
            expenseObject.ExpensesID = data.id;

            this.props.handleAddRecord(expenseObject);
          }, (err) => {
            console.log("expensesModal: handleSubmit - error: ${err}");
          });
    }

    //Close modal
    this.setState({modalOpen: false})
  };
  
  render () {
    return (
      <Modal 
        open={this.state.modalOpen}
        trigger={<Button size={"small"} icon={"edit"} onClick={this.handleOpen}>{this.props.buttonName}</Button>}>
        <Modal.Header>Add/Edit Expense</Modal.Header>
        <Modal.Content scrolling>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input label='Name' name='Name' onChange={this.handleChange} value={this.state.Name} />
                <Form.Select label='Credit Or Debit' name='CreditOrDebit' options={optionCreditOrDebit} onChange={this.handleChange}  defaultValue={this.state.CreditOrDebit} />
                <Form.Select label='Type' name='ExpensesTypeID' options={optionPaymentType} onChange={this.handleChange} defaultValue={this.state.ExpensesTypeID}  />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field >
                  <Checkbox label='is Credit Card?' name='isCreditCard' onChange={this.handleChange}  checked={this.state.isCreditCard}  />
                </Form.Field>
                <Form.Checkbox label='is Paid?' name='isPaid' type='checkbox' onChange={this.handleChange} checked={this.state.isPaid}  />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input label='ExpenseDate' name='ExpenseDate' onChange={this.handleChange} value={this.state.ExpenseDate} />
                <Form.Input label='Amount' name='Amount' onChange={this.handleChange} value={this.state.Amount} />
              </Form.Group>
            <Button onClick={this.handleClose} >Cancel</Button>  
            <Button onClick={this.handleSubmit} >Submit</Button>
          </Form>
          <br /><br /><br /><br /><br />
        </Modal.Content>
      </Modal>
    )
  }
}


module.exports = expensesModal;