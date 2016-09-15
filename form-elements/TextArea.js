var React = require('react');
var TextArea = React.createClass({
  render() {
    var schema = this.props.schema;
    return (
      <div className="form-group">
        <label htmlFor="comment">{schema.templateOptions.label}<span>{schema.templateOptions.isRequired ? '*' : ''}</span></label>
        <textarea className="form-control" rows="5" id="comment" placeholder={schema.templateOptions.placeholder}></textarea>
      </div>
    );
  }
});

module.exports = TextArea;