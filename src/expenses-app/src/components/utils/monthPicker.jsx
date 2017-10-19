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

        this.state = {
            mvalue: {year: 2014, month: 11}
        }

        this.handleClickMonthBox = this.handleClickMonthBox.bind(this)
        this.handleAMonthDissmis = this.handleAMonthDissmis.bind(this)
    }

    handleClickMonthBox(e) {
        this.refs.pickAMonth.show()
    }

    handleAMonthDissmis(value) {
        this.setState( {mvalue: value} )
    }

    render() {
        
        let pickerLang = {
                months: ['Jan', 'Feb', 'Mar', 'Spr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                , from: 'From', to: 'To'
            }
            , mvalue = {year: 2015, month: 11}
            , mrange = {from: {year: 2014, month: 8}, to: {year: 2015, month: 5}}
    
        let makeText = m => {
            if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
            return '?'
        }
    
        return (

            <div className="edit">
                <Picker
                    ref="pickAMonth"
                    years={[2008, 2010, 2011, 2012, 2014, 2015, 2016, 2017]}
                    value={mvalue}
                    lang={pickerLang.months}
                    onChange={this.handleAMonthChange}
                    onDismiss={this.handleAMonthDissmis}
                    >
                    <MonthBox value={makeText(mvalue)} onClick={this.handleClickMonthBox} />
                </Picker>
            </div>
        )
    }
}

export default MonthPicker;