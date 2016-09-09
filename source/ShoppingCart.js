import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import constants from './constants';
import {Modal, Button} from 'react-bootstrap';


// Spec object definiction for Shoping cart
const ShoppingCartSpec = {
  drop(connect, monitor, component) {
    var draggedControl = Object.assign({ id: new Date().getTime() }, monitor.getItem().schema);
    component.state.controls.push(draggedControl);
    component.setState({
      controls: component.state.controls
    });
    return {
      name: 'ShoppingCart',
    };
  }
};

//  Shopping cart collection function
let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    dropItem: monitor.getItem()
  };
}

// Shopping cart component
var ShoppingCart = React.createClass({
  propTypes: {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    dropItems: PropTypes.object,
  },
  getInitialState() {
    return {
      controls: []
    }
  },
  deleteControl(toRemove) {
    this.setState({
      controls: this.state.controls.filter(x => x.id !== toRemove.id)
    });
  },

  render() {
    const { canDrop, isOver, connectDropTarget, dropItems} = this.props;
    const isActive = canDrop && isOver;
    let backgroundColor = '#FFFFFF';
    backgroundColor = isActive ? '#F7F7BD' : '#F7F7F7';
    const style = {
      backgroundColor: backgroundColor
    };
    var listStyle = { 'listStyleType': 'none' };
    return connectDropTarget(
      <div className='shopping-cart' style={ style }>
        <ul style={listStyle}>
          {
            this.state.controls.map((item, i) =>
              (
                <li draggable="true" key={i}>
                  <Wrapper key={i} schema={item} onDelete={this.deleteControl} />
                </li>
              )
            )
          }
        </ul>
      </div>
    );
  }
});


// Wrapper for controls that are being dragged
var Wrapper = React.createClass({
    getInitialState(){
        return this.state={
            modelState :false
        }
    },
  getFormControl() {
    var control;
    switch (this.props.schema.type) {
      case 'input':
        control = <TextBox propVal = {this.props.schema}/>
        break;
      case "textArea":
        control = <TextArea propVal = {this.props.schema}/>
        break;
      case 'multiCheckbox':
      case 'checkbox':
        control = <CheckBox propVal = {this.props.schema}/>
        break;
      case "radio":
        control = <Radio propVal={this.props.schema}/>
        break;
      case 'select':
        control = <DropDown propVal = {this.props.schema}/>
        break;
    }
    return control;
  },
  onDelete() {
    this.props.onDelete(this.props.schema);
  },
  handleEdit(type) {
    console.log('edit clicked');
    this.setState({
      modelState :true
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
          (this.state.modelState==true) ? 
          <ModelContainer displayState={this.state.modelState}/>
          : null
        }
        <ModelContainer displayState={this.state.modelState}/>
        <div className="overlap-dragbox" data-toggle="modal" data-target="#textboxModal"></div>
      </div>
    );
  }
});

var TextBox = React.createClass({
  render() {
    var prop = this.props.propVal;
    return (
      <div className="form-group">
        <label htmlFor="usr">{prop.templateOptions.label}: </label>
        <input type="text" className="form-control"/>
      </div>
    );
  }
});

var TextArea = React.createClass({
  render() {
    var prop = this.props.propVal;
    return (
      <div className="form-group">
        <label htmlFor="comment">{prop.templateOptions.label}</label>
        <textarea className="form-control" rows="5" id="comment"></textarea>
      </div>
    );
  }
});

var Radio = React.createClass({
  render() {
    var prop = this.props.propVal;
    return (
      <form>
        <p>{prop.templateOptions.label}</p>
        {
          prop.templateOptions.options.map((item, i) => (
            <div className="radio" key={i}>
              <label><input type="radio" value={item.value}/>{item.name}</label>
            </div>
          )
          ) }
      </form>
    );
  }
});

var CheckBox = React.createClass({
  render() {
    var prop = this.props.propVal;
    var multiCheck = false;
    if (prop.templateOptions.options !== undefined) {
      multiCheck = true;
    }
    return (
      (multiCheck == true)
        ? <div>
          {
            prop.templateOptions.options.map((item, i) => (
              <div className="checkbox" key={i}>
                <label><input type="checkbox" value=""/>{item.name}</label>
              </div>
            )
            ) }

        </div>

        : <div className="checkbox">
          <label><input type="checkbox" value=""/>Option 1</label>
        </div>
    );
  }
});

var DropDown = React.createClass({
  render() {
    var prop = this.props.propVal;
    return (
      <div className="form-group">
        <label htmlFor="sel1">{prop.templateOptions.label}: </label>
        {
          <select className="form-control">
            {
              prop.templateOptions.options.map((item, i) => (
                <option value={item.value} key={i}>{item.name}</option>
              )
              ) }
          </select>
        }
      </div>
    );
  }
});

var ModelContainer = React.createClass({
  getInitialState() {
    //return { show: this.props.displayState };
    return { show: this.props.displayState };
  },
  hideModal() {
    this.setState({ show: false });
  },
  changeState(){
    this.props.onStateChange()
  },
  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.hideModal}
        dialogClassName="custom-modal"
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This is model body
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart);
