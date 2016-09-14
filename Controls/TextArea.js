var React = require('react');
var TextArea = React.createClass({
  render() {
    var prop = this.props.propVal;
    return (
      <div className="form-group">
        <label htmlFor="comment">{prop.templateOptions.label}<span>{prop.templateOptions.isRequired ? '*' : ''}</span></label>
        <textarea className="form-control" rows="5" id="comment" placeholder={prop.templateOptions.placeholder}></textarea>
      </div>
    );
  }
});

module.exports = TextArea;