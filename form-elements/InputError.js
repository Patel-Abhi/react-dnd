var React = require('react');
var InputError = React.createClass({
    render() {
       var spanStyle = { 'color': 'red' };
        return (
            <div>
                {
                    this.props.visible
                        ? <div className="form-group has-warning has-feedback">
                            <span style={spanStyle}>{this.props.errorMessage}</span>
                        </div>
                        : ''
                }
            </div>
        )
    }
});

module.exports = InputError;