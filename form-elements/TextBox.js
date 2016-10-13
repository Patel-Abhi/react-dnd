var React = require('react');
//var InputError = require('./InputError');
var TextBox = React.createClass({
    propTypes: {
        label: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
        error: React.PropTypes.string
    },
    getInitialState() {
        return {
            value: '',
            errorClass: 'form-group',
            errorMessage: '',
            valid: false
        }
    },
    handleChange(evt) {
        this.setState({
            value:evt.target.value
        })
        this.validate(evt);
        this.props.onChange(this.state);
    },

    validate(evt) {
        var value = evt.target.value;
        var errorMessage = '';
        var valid = false;
        var errorClass = 'form-group';
        if (this.props.dataType && this.props.dataType.toLowerCase() === 'email') {
            var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regEx.test(value)) {
                errorMessage = 'Email address is not valid';
                errorClass = 'form-group has-error';
                valid = false;
            }
        }
        // else if (this.props.dataType && this.props.dataType.toLowerCase() === 'number') {
        // evt.target.addEventListener('keyup', function (e) {
        //     console.log(e.key.charCodeAt(0));
        //     var regEx = /^\d+(\.\d+)?$/;
        //     var charCode = e.key.charCodeAt(0);
        //     console.log('test : ' + regEx.test(e.key));
        //     if (regEx.test(e.key) === false) {
        //         errorMessage = 'Only numbers are allowed';
        //         errorClass = 'form-group has-error';
        //     }
        //     return;
        // })
        // return;

        // }
        else if (this.props.isRequired && value.length === 0) {
            errorMessage = this.props.label + ' is required';
            errorClass = 'form-group has-error';
             valid = false;
        } else if (this.props.minChars && value.length < minChars) {
            errorMessage = 'Input char should be atleast ' + this.props.minChar;
            errorClass = 'form-group has-error';
        }
        this.setState({
            errorClass: errorClass,
            errorMessage: errorMessage,
             valid : valid,
             value: value
        })
    },
    render() {
        return (
            <div className={this.state.errorClass}>
                <label htmlFor="usr">{this.props.label} {this.props.isRequired ? '*' : '' }: </label>
                <input
                    placeholder={this.props.text}
                    className={'form-control'}
                    value={this.state.value}
                    onChange={this.handleChange}
                    />
                <div>{this.state.errorMessage}</div>
            </div>
        );
    }
});

module.exports = TextBox;