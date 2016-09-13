var React = require('react');
var TextBox = require('../Controls/TextBox');
var TextArea = require('../Controls/TextBox');
var Radio = require('../Controls/TextBox');
var CheckBox = require('../Controls/CheckBox');
var DropDown = require('../Controls/DropDown');
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
                control = <TextBox propVal = {this.state.schema}/>
                break;
            case "textArea":
                control = <TextArea propVal = {this.state.schema}/>
                break;
            case 'multiCheckbox':
            case 'checkbox':
                control = <CheckBox propVal = {this.state.schema}/>
                break;
            case "radio":
                control = <Radio propVal={this.state.schema}/>
                break;
            case 'select':
                control = <DropDown propVal = {this.state.schema}/>
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
    changeSchema(newSchema) {
        //console.log(newSchema);
        this.setState({
            schema: newSchema
        })
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
                        <ModelContainer displayState={this.state.modelState} changeState={this.changeModelState} schema={this.props.schema} onSchemaEdit = {this.changeSchema}/>
                        : null
                }
                <div className="overlap-dragbox" data-toggle="modal" data-target="#textboxModal"></div>
            </div>
        );
    }
});


module.exports = Wrapper;