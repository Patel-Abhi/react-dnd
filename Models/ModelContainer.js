var React = require('react');
import {Modal, Button} from 'react-bootstrap';
var TextBoxEdit = require('./TextInputModel');
var CheckboxEdit = require('./CheckBoxModel');
var RadioEdit = require('./RadioEditModel');

var ModelContainer = React.createClass({
    getControlModel() {
        var model;
        switch (this.props.schema.type) {
            case 'input':
            case "textArea":
                model = <TextBoxEdit schema = {this.props.schema} callbackParent={this.getChildProp} />
                break;
            case 'checkbox':
                model = <CheckboxEdit schema = {this.props.schema} callbackParent={this.getChildProp}/>
                break;
            case 'multiCheckbox':
            case "radio":
            case 'select':
                model = <RadioEdit schema = {this.props.schema} callbackParent={this.getChildProp}/>
                break;
        }
        return model;
    },

    getInitialState() {
        return { show: this.props.displayState };
    },
    hideModal() {
        this.setState({ show: false });
        this.props.changeState(this.props.displayState);
        //this.props.onSchemaUpdate(this.props.schema);
    },
    getChildProp(state) {
        this.props.onSchemaUpdate(state)
    },
    render() {
        return (
            <Modal
                show={this.state.show}
                onHide={this.hideModal}
                dialogClassName="custom-modal"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Edit {this.props.schema.type}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.getControlModel() }
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }
});

module.exports = ModelContainer;