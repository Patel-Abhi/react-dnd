var React = require('react');

var DropDown = React.createClass({
    render() {
        var schema = this.props.schema;
        return (
            <div className="form-group">
                <label htmlFor="sel1">{schema.templateOptions.label}: </label>
                {
                    <select className="form-control">
                        {
                            schema.templateOptions.options.map((item, i) => (
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