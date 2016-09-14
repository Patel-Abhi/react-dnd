var React = require('react');

var CheckboxEdit = React.createClass({
    getInitialState() {
        var prop = this.props.schema;
        return {
            id: this.props.schema.id,
            type: this.props.schema.type,
            label: prop.templateOptions.label
        }
    },
    handleChange(e) {
        this.state[e.target.name] = e.target.value
        this.setState({
            state: this.state
        })
    },
    handleSubmit(e) {
        e.preventDefault();
        var prop = this.props.schema;

        prop = {
            id: this.state.id,
            type: this.props.schema.type,
            templateOptions: {
                label: this.state.label
            }
        };
        //console.log(prop);
        this.props.callbackParent(prop);
    },
    render() {
        return (
            <form className="form-horizontal col-sm-12" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="id">Id: </label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" name="id" value={this.state.id} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="pwd">Label Text: </label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" name="label" value={this.state.label} onChange={this.handleChange}/>
                    </div>
                </div>
                <button type="submit" className="col-sm-3 btn btn-primary">Save</button>
            </form>
        );
    }
});

module.exports = CheckboxEdit;