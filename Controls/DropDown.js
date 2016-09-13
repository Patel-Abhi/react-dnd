var React = require('react');

var DropDown = React.createClass({
    render() {
        var prop = this.props.propVal;
        return (
            <div className="form-group">
                <label htmlFor="sel1">{prop.templateOptions.label}: </label>
                {
                    <select className="form-control">
                        {
                            prop.templateOptions.options.map((item, i) => (
                                <option value={item.value} key={i}>{item.name}</option>
                            )
                            ) }
                    </select>
                }
            </div>
        );
    }
});


module.exports = DropDown;