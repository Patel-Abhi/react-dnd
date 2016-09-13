var React = require('react');

var CheckboxEdit = React.createClass({
    getInitialState() {
        var prop = this.props.schema;
        return {
            data: {
                'id': '',
                'label': prop.templateOptions.label
            }
        }
    },
    handleChange(e) {
        this.state.data[e.target.name] = e.target.value
        console.log(this.state.data[e.target.name]);
        this.setState({
            state: this.state
        })
        var prop = this.props.schema;

        prop = {
            id: this.state.data.id,
            templateOptions: {
                label: this.state.data.label,
            }
        };
        this.props.callbackParent(prop);
    },
    render() {
        return (
            <form className="form-horizontal col-sm-12">
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="email">Id: </label>
                    <div className="col-sm-9">
                        <input type="email" className="form-control" name="id" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="pwd">Label Text: </label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" name="label" value={this.state.data.label} onChange={this.handleChange}/>
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = CheckboxEdit;