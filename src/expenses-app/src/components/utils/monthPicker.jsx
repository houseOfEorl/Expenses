import Picker from 'react-month-picker';
var React = require('react');


class MonthBox extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            value: this.props.value || 'N/A'
        }

        this._handleClick = this._handleClick.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            value: nextProps.value || 'N/A'
        })
    }

    render() {

        return (
            <div className="box" onClick={this._handleClick}>
                <label>{this.state.value}</label>
            </div>
        )
    }

    _handleClick(e) {
        this.props.onClick && this.props.onClick(e)
    }
}

class MonthPicker extends React.Component {

    constructor(props, context) {
        super(props, context)

        var currentTime = new Date();
        var currentYear = currentTime.getFullYear();
        var currentMonth = currentTime.getMonth() + 1;

        this.state = {
            mvalue: {year: currentYear, month: currentMonth}
        }

        this.handleClickMonthBox = this.handleClickMonthBox.bind(this)
        this.handleAMonthDissmis = this.handleAMonthDissmis.bind(this)
        this.handleAMonthChange = this.handleAMonthChange.bind(this)
    }

    handleClickMonthBox(e) {
        this.refs.pickAMonth.show();
    }

    handleAMonthDissmis(value) {
        this.setState( {mvalue: value} );
        this.props.actionChangePeriod(value);
    }

    handleAMonthChange(year, month, idx) {
        console.log(year);
        console.log(month);
        // this.setState( {mvalue: value} );
        // this.props.actionChangePeriod(value);
    }

    render() {
        
        let pickerLang = {
                months: ['Jan', 'Feb', 'Mar', 'Spr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                , from: 'From', to: 'To'
            }
    
        let makeText = m => {
            if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
            return '?'
        }
    
        return (

            <div>
                <Picker
                    ref="pickAMonth"
                    value={this.state.mvalue}
                    lang={pickerLang.months}
                    onChange={this.handleAMonthChange}
                    onDismiss={this.handleAMonthDissmis}
                    >
                    <MonthBox value={makeText(this.state.mvalue)} onClick={this.handleClickMonthBox} />
                </Picker>
            </div>
        )
    }
}

export default MonthPicker;