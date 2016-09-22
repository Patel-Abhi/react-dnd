var React = require('react');
var PropTypes = React.PropTypes;
var TextBox = React.createClass({
  getInitialState() {
    return this._serializeProp(this.props.schema);
  },
  // propTypes: {
  //   name: PropTypes.string.isRequired,
  //   label: PropTypes.string.isRequired,
  //   onChange: PropTypes.func.isRequired,
  //   placeholder: PropTypes.string,
  //   value: PropTypes.string,
  //   error: PropTypes.string
  // },
  _serializeProp(prop) {
    var newProp = {
      name: prop.key,
      label: prop.templateOptions.label,
      placeholder: prop.templateOptions.placeholder,
      value: prop.templateOptions.value
    }
    return newProp;
  },
  render() {
    console.log(this.state);
    var wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += ' ' + 'has-error';
    }

    var schema = this.props.schema;
    return (
      <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <input type="text"
            name={this.props.name}
            ref={this.props.name}
            className="form-control"
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}
            value={this.props.value}/>
          <div className="input">
            {this.props.error}
          </div>
        </div>
      </div>      
    );
  }
});

module.exports = TextBox;