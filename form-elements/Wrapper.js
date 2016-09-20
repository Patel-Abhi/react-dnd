var React = require('react');
var TextBox = require('../form-elements/TextBox');
var TextArea = require('../form-elements/TextArea');
var Radio = require('../form-elements/Radio');
var CheckBox = require('../form-elements/CheckBox');
var DropDown = require('../form-elements/DropDown');
var ModelContainer = require('../Models/ModelContainer');

var Wrapper = React.createClass({
    getInitialState() {
        return this.state = {
            modelState: false,
            schema: this.props.schema
        }
    },
    getFormControl() {
        var control;
        switch (this.props.schema.type) {
            case 'input':
                control = <TextBox schema = {this.state.schema}/>
                break;
            case "textArea":
                control = <TextArea schema = {this.state.schema}/>
                break;
            case 'multiCheckbox':
            case 'checkbox':
                control = <CheckBox schema = {this.state.schema}/>
                break;
            case "radio":
                control = <Radio schema={this.state.schema}/>
                break;
            case 'select':
                control = <DropDown schema = {this.state.schema}/>
                break;
        }
        return control;
    },
    handleEdit() {
        this.setState({
            modelState: true
        })
    },
    changeModelState() {
        this.setState({ modelState: false })
    },
    updateSchema(newSchema) {
        this.setState({
            schema: newSchema,
            modelState: false
        });
        this.props.updateSchema(this.state.schema.id,newSchema);
    },
    render() {
        return (
            <div className="drag-box">
                <div className="close-btn" onClick={this.onDelete}>
                    <a href="#"><i className="fa fa-times" aria-hidden="true"></i></a>
                </div>
                <div className="gear-btn" onClick = {this.handleEdit}>
                    <a href="#"><i className="fa fa-gear" aria-hidden="true"></i></a>
                </div>
                {this.getFormControl() }
                {
                    (this.state.modelState === true) ?
                        <ModelContainer displayState={this.state.modelState} changeState={this.changeModelState} schema={this.state.schema} onSchemaUpdate = {this.updateSchema}/>
                        : null
                }
                <div className="overlap-dragbox" data-toggle="modal" data-target="#textboxModal"></div>
            </div>
        );
    }
});


module.exports = Wrapper;