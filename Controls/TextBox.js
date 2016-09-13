var React = require('react');
var TextBox = React.createClass({
  render() {
    var prop = this.props.propVal;
    return (
      <div className="form-group">
        <label htmlFor="usr">{prop.templateOptions.label}: </label>
        <span>{prop.templateOptions.isRequired ? '*' : ''}</span><input type="text" className="form-control" placeholder={prop.templateOptions.placeholder}/>
      </div>
    );
  }
});

module.exports = TextBox;