var React = require('react');
var TextBox = require('../form-elements/TextBox');
var TextArea = require('../form-elements/TextArea');
var Radio = require('../form-elements/Radio');
var CheckBox = require('../form-elements/CheckBox');
var DropDown = require('../form-elements/DropDown');
var ModelContainer = require('../Modals/ModalWrapper');

var Wrapper = React.createClass({
    getInitialState() {
        return this.state = {
            modelState: false,
            schema: this.props.schema
        }
    },
    handleChange(){

    },
    getFormControl() {
        var control;
        switch (this.props.schema.type) {
            case 'input':
                control = <TextBox schema = {this.state.schema} label = {this.props.schema.templateOptions.label} text="TextBox" onChange={this.handleChange} name={this.props.schema.templateOptions.label}/>
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
        onDelete() {
        this.props.onDelete(this.props.schema);
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
        this.props.updateSchema(this.state.schema.key,newSchema);
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

            </div>
        );
    }
});


module.exports = Wrapper;