import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import constants from './constants';

const ShoppingCartSpec = {
  drop(connect, monitor, component) {
    var abc = monitor.getItem().schema;
    var controls = component.state.controls;
    controls.push(abc);
    component.setState({
      controls: controls
    });
    return {
      name: 'ShoppingCart',
    };
  }
};

let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    dropItem: monitor.getItem()
  };
}

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
  getFormControl(schema) {
    var control;
    switch (schema.type) {
      case 'input':
        control = <Wrapper><TextBox propVal = {schema}/></Wrapper>;
        break;
      case 'multiCheckbox':
      case 'checkbox':
        control = <Wrapper><CheckBox propVal = {schema}/></Wrapper>;
        break;
      case 'select':
        control = <Wrapper><DropDown propVal = {schema}/></Wrapper>;
        break;
    }
    return control;
  },
  render() {

    const { canDrop, isOver, connectDropTarget, dropItems} = this.props;
    const isActive = canDrop && isOver;
    let backgroundColor = '#FFFFFF';
    backgroundColor = isActive ? '#F7F7BD' : '#F7F7F7';
    const style = {
      backgroundColor: backgroundColor
    };
    var placeholder = document.createElement("li");
    placeholder.className = "placeholder";
    var listStyle = { 'listStyleType': 'none' };
    var ctrlState = this.state.controls;
    return connectDropTarget(
      <div className='shopping-cart' style={ style }>
        <ul  style={listStyle} onDragOver={this.dragOver}>
          {
            this.state.controls.map((item, i) =>
              (<li key={i}>
                {this.getFormControl(item) }
              </li>)
            )
          }
        </ul>
      </div>
    );
  }
});

var Wrapper = React.createClass({
  handleClose(e) {
    console.log(e);
  },
  render() {
    var prop = this.props.children;
    console.log(this.props.children);
    return (
      <div className="drag-box">
        <div className="close-btn" onClick={this.handleClose}>
          <a href="#"><i className="fa fa-times" aria-hidden="true"></i></a>
        </div>
        {this.props.children}
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

var Radio = React.createClass({
  render() {
    var prop = this.props.propVal;
    return (
      <div className="radio">
        {
          prop.templateOptions.options.forEach((item) => {
            <label><input type="radio" name="optradio" value={item.value}/>{item.name}</label>
          })
        }

      </div>
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

export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart);
