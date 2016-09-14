var React = require('react');

var CheckBox = React.createClass({
    render() {
        var prop = this.props.propVal;
        var multiCheck = false;
        if (prop.templateOptions.options !== undefined) {
            multiCheck = true;
        }
        return (
            (multiCheck === true)
                ? <div>
                    <p>{prop.templateOptions.label}</p>
                    {
                        prop.templateOptions.options.map((item, i) => (
                            <div className="checkbox" key={i}>
                                <label><input type="checkbox" value=""/>{item.name}</label>
                            </div>
                        )
                        ) }

                </div>

                : <div className="checkbox">
                    <label><input type="checkbox" value=""/>{prop.templateOptions.label}</label>
                </div>
        );
    }
});

module.exports = CheckBox;