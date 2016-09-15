var React = require('react');
var TextBox = React.createClass({
  render() {
    var schema = this.props.schema;
    return (
      <div className="form-group">
        <label htmlFor="usr">{schema.templateOptions.label}: </label>
        <span>{schema.templateOptions.isRequired ? '*' : ''}</span><input type="text" className="form-control" placeholder={schema.templateOptions.placeholder}/>
      </div>
    );
  }
});

module.exports = TextBox;