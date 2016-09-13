var React = require('react');
var Radio = React.createClass({
  render() {
    var prop = this.props.propVal;
    return (
      <form>
        <p>{prop.templateOptions.label}</p>
        {
          prop.templateOptions.options.map((item, i) => (
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