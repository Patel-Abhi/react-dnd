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
                model = <TextBoxEdit schema = {this.props.schema} callbackParent={this.getChildState} />
                break;
            case 'checkbox':
                model = <CheckboxEdit schema = {this.props.schema} callbackParent={this.getChildState}/>
                break;
            case 'multiCheckbox':
            case "radio":
            case 'select':
                model = <RadioEdit schema = {this.props.schema} callbackParent={this.getChildState}/>
                break;
        }
        return model;
    },

    getInitialState() {
        console.log(this.props.schema.type);
        return { show: this.props.displayState };
    },
    hideModal() {
        this.setState({ show: false });
        this.props.changeState(this.props.displayState);
        this.props.onSchemaEdit(this.props.schema);
    },
    getChildState(state) {
        return state;
        //this.props.onSchemaEdit(state)
    },
    handleClick() {
        this.props.onSchemaEdit(getChildState());
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
                    <div className="modal-footer">
                        <button type="submit" className="col-sm-3 btn btn-primary" onClick={this.handleClick}>Save</button>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
});

module.exports = ModelContainer;