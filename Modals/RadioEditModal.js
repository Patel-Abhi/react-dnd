var React = require('react');

var RadioEdit = React.createClass({
    getInitialState() {
        return {
            id:this.props.schema.id,
            options: this._stringifyOptions(this.props.schema.templateOptions.options),
            label: this.props.schema.templateOptions.label
        }
    },
    handleChange(e) {
        var state = {};
        state[e.target.name] = e.target.value;
        this.setState(state);
    },
    _stringifyOptions(obj) {
        var str = obj.reduce(function (prevValue, options) {
            return prevValue ? prevValue + '\n' +  options.value : options.value;
        }, '');
        return str;
    },
    _parseOptions(str) {
        var objArray = str.split('\n');
        return objArray.map((item) => {
            return {
                name: item,
                value: item
            }
        });
    },
    handleSubmit(e) {
        e.preventDefault();
        var state = this.state;
         var prop = this.props.schema;

        prop = {
            id: this.state.id,
            type: this.props.schema.type,
            templateOptions: {
                label: this.state.label,
                options: this._parseOptions(state.options)
            },            
        };

        this.props.callbackParent(prop);
    },
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-horizontal col-sm-12">
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="email">Id: </label>
                    <div className="col-sm-9">
                        <input type="text" name="id" id="id"  className="form-control" value={this.state.id} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="pwd">Label Text: </label>
                    <div className="col-sm-9">
                        <input type="text" name="label" id="label" className="form-control" value={this.state.label} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="pwd">Options: </label>
                    <div className="col-sm-9">
                        <textarea className="form-control" name="options" id="options" value={this.state.options} onChange={this.handleChange}/>
                    </div>
                </div>
                <button type="submit" className="col-sm-3 btn btn-primary">Save</button>
            </form>
        );
    }
});

module.exports = RadioEdit;