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
  console.log(monitor.getItem());
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    abc:monitor.getItem(),
    canDrop: monitor.canDrop()
  };
}

var ShoppingCart = React.createClass({
  getInitialState() {
    return this.state = {
      data: ''
    }
  },
  propTypes: {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    abc:PropTypes.object
  },
 defaultProps: {
   abc: {}
 },
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = '#FFFFFF';
    backgroundColor = isActive ? '#F7F7BD' : '#F7F7F7';

    const style = {
      backgroundColor: backgroundColor
    };

    return connectDropTarget(
      <div className='shopping-cart' style={ style }>

        { isActive ? 'Hummm, snack!' : 'Drag here to order!' }
        {console.log('-------------'+this.props.abc)}
      </div>
    );
  }
});


export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart);
