import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import constants from './constants';
import ShoppingCart from './ShoppingCart';

var name = [];

const snackSpec = {
  beginDrag(props) {
    return {
      name: props.name,
      schema: props.schema
    };
  },
  endDrag(props, monitor,component) {
    const dragItem = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      <ShoppingCart/>
      name.push(dragItem.name);
    }
  },
};



let collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

var FormElement = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  },
  render() {
    const { name, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    var spanStyle={'display':'inline-block','width':'250px','padding':'10px', 'border':'1px solid green','textAlign':'center'};
    const style = {
      opacity: opacity
    };

    return connectDragSource(
      <div>
        <span style={spanStyle}>{this.props.schema.type}</span>
      </div>
    );
  }
});

export default DragSource(constants.FormElement, snackSpec, collect)(FormElement);
