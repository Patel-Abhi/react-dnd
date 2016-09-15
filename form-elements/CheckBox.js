var React = require('react');

var CheckBox = React.createClass({
    render() {
        var schema = this.props.schema;
        var multiCheck = false;
        if (schema.templateOptions.options !== undefined) {
            multiCheck = true;
        }
        return (
            (multiCheck === true)
                ? <div>
                    <p>{schema.templateOptions.label}</p>
                    {
                        schema.templateOptions.options.map((item, i) => (
                            <div className="checkbox" key={i}>
                                <label><input type="checkbox" value=""/>{item.name}</label>
                            </div>
                        )
                        ) }

                </div>

                : <div className="checkbox">
                    <label><input type="checkbox" value=""/>{schema.templateOptions.label}</label>
                </div>
        );
    }
});

module.exports = CheckBox;