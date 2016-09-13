var React = require('react');

var RadioEdit = React.createClass({
    getInitialState() {
        console.log(this.props.schema);
        return {
            data: {
                'id': '',
                'options': [],
                'label': this.props.schema.templateOptions.label
            }
        }
    },
    render() {
        return (
            <form className="form-horizontal col-sm-12">
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="email">Id: </label>
                    <div className="col-sm-9">
                        <input type="email" className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="pwd">Label Text: </label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" value={this.state.label}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="pwd">Options: </label>
                    <div className="col-sm-9">
                        <textarea className="form-control" id="text-area" value={this.props.schema.templateOptions.options.join('\n') }/>
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = RadioEdit;