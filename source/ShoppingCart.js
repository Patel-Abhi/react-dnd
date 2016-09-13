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

var TextBox = React.createClass({
  render() {
    var prop = this.props.propVal;
    return (
      <div className="form-group">
        <label htmlFor="usr">{prop.templateOptions.label}: </label>
        <span>{prop.templateOptions.isRequired ? '*' : ''}</span><input type="text" className="form-control" placeholder={prop.templateOptions.placeholder}/>
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
          <label><input type="checkbox" value=""/>{prop.templateOptions.label}</label>
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

// Model container for controls that are being dragged
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
    this.props.onSchemaEdit(state)
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
            <button type="submit" className="col-sm-3 btn btn-primary">Save</button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
});


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
    var prop = this.props.schema;

    prop = {
      id: this.state.data.id,
      templateOptions: {
        label: this.state.data.label,
        isRequired: this.state.data.isRequired,
        placeholder: this.state.data.placeholder
      }
    };
    this.props.callbackParent(prop);
  },
  render() {
    return (
      <form className="form-horizontal col-sm-12">
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
      </form>
    );
  }
});

var CheckboxEdit = React.createClass({
  getInitialState() {
    var prop = this.props.schema;
    return {
      data: {
        'id': '',
        'label': prop.templateOptions.label
      }
    }
  },
  handleChange(e) {
    this.state.data[e.target.name] = e.target.value
    console.log(this.state.data[e.target.name]);
    this.setState({
      state: this.state
    })
    var prop = this.props.schema;

    prop = {
      id: this.state.data.id,
      templateOptions: {
        label: this.state.data.label,
      }
    };
    this.props.callbackParent(prop);
  },
  render() {
    return (
      <form className="form-horizontal col-sm-12">
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="email">Id: </label>
          <div className="col-sm-9">
            <input type="email" className="form-control" name="id" onChange={this.handleChange}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="pwd">Label Text: </label>
          <div className="col-sm-9">
            <input type="text" className="form-control" name="label" value={this.state.data.label} onChange={this.handleChange}/>
          </div>
        </div>
      </form>
    );
  }
});


var RadioEdit = React.createClass({
  getInitialState() {
    console.log(this.props.schema);
    return { 
      data:{
        'id':'',
        'options':this.props.templateOptions.options,
        'label':this.props.templateOptions.label
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
            <textarea className="form-control" />
          </div>
        </div>
      </form>
    );
  }
});



export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart);
