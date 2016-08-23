import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import constants from './constants';

const ShoppingCartSpec = {
  drop() {
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
  getInitialState() {
    return this.state = {
      data: []
    }
  },
  propTypes: {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    dropItem: PropTypes.object
  },
  render() {
    const { canDrop, isOver, connectDropTarget, dropItem} = this.props;
    const isActive = canDrop && isOver;
    let backgroundColor = '#FFFFFF';
    backgroundColor = isActive ? '#F7F7BD' : '#F7F7F7';
console.log(dropItem);
    const style = {
      backgroundColor: backgroundColor
    };

    return connectDropTarget(
      <div className='shopping-cart' style={ style }>
        { isActive ? 'Hummm, snack!' : 'Drag here to order!' }

      </div>
    );
  }
});

export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart);
