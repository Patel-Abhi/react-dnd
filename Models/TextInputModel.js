var React = require('react');

var TextBox = require('../Controls/TextBox')

var TextBoxEdit = React.createClass({
    getInitialState() {
        //console.log('from text box model');
        //console.log(this.props.schema);
        var prop = this.props.schema;
        return {
                id: prop.id,
                type:prop.type,
                label: prop.templateOptions.label,
                placeholder: prop.templateOptions.placeholder,
                isRequired: prop.templateOptions.isRequired
        }
    },
    handleChange(e) {
        if (e.target.name === 'isRequired') {
            this.state[e.target.name] = e.target.checked
        }
        else {
            this.state[e.target.name] = e.target.value
        }
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
                label: this.state.label,
                isRequired: this.state.isRequired,
                placeholder: this.state.placeholder

            }
        };
        //console.log(prop);
        this.props.callbackParent(prop);
    },
    render() {
        return (
            <form className="form-horizontal col-sm-12" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="email">Id: </label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" name="id" value={this.state.id} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="pwd">Label Text: </label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" name="label" value={this.state.label} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="pwd">Placeholder: </label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" name="placeholder" value={this.state.placeholder} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="pwd" style={{ paddingTop: 0 }}>Required</label>
                    <div className="col-sm-9">
                        <input type="checkbox" name="isRequired" checked={this.state.isRequired} onChange={this.handleChange}/>
                    </div>
                </div>
                <button type="submit" className="col-sm-3 btn btn-primary">Save</button>
            </form>
        );
    }
});

module.exports = TextBoxEdit;