var React = require('react');
var Radio = React.createClass({
  render() {
    var schema = this.props.schema;
    return (
      <form>
        <p>{schema.templateOptions.label}</p>
        {
          schema.templateOptions.options.map((item, i) => (
            <div className="radio" key={i}>
              <label><input type="radio" value={item.value}/>{item.name}</label>
            </div>
          )
          ) }
      </form>
    );
  }
});

module.exports = Radio;