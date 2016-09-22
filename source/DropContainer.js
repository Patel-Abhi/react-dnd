import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import constants from './constants';
var Wrapper = require('../form-elements/Wrapper');


// Spec object definiction for DropContainer 
const DropContainerSpec = {
  drop(connect, monitor, component) {
    var draggedControl = Object.assign({ id: new Date().getTime() }, monitor.getItem().schema);
    component.state.controls.push(draggedControl);
    component.setState({
      controls: component.state.controls
    });
    component.props.onDropItem(component.state.controls);
    return {
      name: 'ShoppingCart',
    };
  }
};

//  Drop Container collection function
let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    dropItem: monitor.getItem()
  };
}

// Drop Container component
var DropContainer = React.createClass({
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

  //Remove a control
  deleteControl(toRemove) {
    var ctrls = this.state.controls.filter(x => x.id !== toRemove.id)
    this.setState({
      controls: ctrls
    });
    this.props.onDropItem(ctrls);
  },

  // update a control
  updateSchema(index, item) {
    var obj = this.state.controls.map((data, i) => {
      if (data.id == index) {
        data = {};
        Object.assign(data, item);
      }
      return data;
    });
    this.props.onDropItem(obj);
    this.setState({
      controls: obj
    })
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
                  <Wrapper key={i} schema={item} onDelete={this.deleteControl} updateSchema = {this.updateSchema}/>
                </li>
              )
            )
          }
        </ul>
      </div>
    );
  }
});

export default DropTarget(constants.FormElement, DropContainerSpec, collect)(DropContainer);
