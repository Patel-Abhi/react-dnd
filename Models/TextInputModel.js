var React = require('react');

var TextBoxEdit = React.createClass({
    getInitialState() {
        var prop = this.props.schema;
        return {
            data: {
                'id': '',
                'label': prop.templateOptions.label,
                'placeholder': prop.templateOptions.placeholder,
                'isRequired': prop.templateOptions.isRequired
            }
        }
    },
    handleChange(e) {
        console.log(e.target.checked);
        if (e.target.name === 'isRequired') {
            this.state.data[e.target.name] = e.target.checked
        }
        else {
            this.state.data[e.target.name] = e.target.value
        }
        this.setState({
            state: this.state
        })
    },
    handleSubmit(e) {
        e.preventDefault();
        var prop = this.props.schema;

        prop = {
            id: this.state.data.id,
            templateOptions: {
                label: this.state.data.label,
                isRequired: this.state.data.isRequired,
                placeholder: this.state.data.placeholder
            }
        };
        console.log(prop);
        //this.props.callbackParent(prop);
    },
    render() {
        return (
            <form className="form-horizontal col-sm-12" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="email">Id: </label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" name="id" value={this.state.data.id} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="pwd">Label Text: </label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" name="label" value={this.state.data.label} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="pwd">Placeholder: </label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" name="placeholder" value={this.state.data.placeholder} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="pwd" style={{ paddingTop: 0 }}>Required</label>
                    <div className="col-sm-9">
                        <input type="checkbox" name="isRequired" value={this.state.data.isRequired} onChange={this.handleChange}/>
                    </div>
                </div>
                <button type="submit" className="col-sm-3 btn btn-primary">Save</button>
            </form>
        );
    }
});

module.exports = TextBoxEdit;