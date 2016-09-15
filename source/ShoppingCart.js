import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import constants from './constants';
var Wrapper = require('../form-elements/Wrapper');
var ModelContainer = require('../Models/ModelContainer');


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
      controls: this.state.controls.filter(x => x.id !== toRemove.id),
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

export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart);
