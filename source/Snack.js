import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import constants from './constants';
var name = [];
const snackSpec = {
  beginDrag(props) {
    return {
      name: props.name,
      schema: props.schema
    };
  },
  endDrag(props, monitor) {
    const dragItem = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      console.log(`You dropped ${dragItem.name} into ${dropResult.name}`);
      name.push(dragItem.name);
      //console.log(dragItem);
    }
  },

};

let collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

var Snack = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  },
  render() {
    const { name, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    const style = {
      opacity: opacity
    };

    return connectDragSource(
      <div>
        <input type={this.props.schema.templateOptions.type} placeholder={this.props.schema.templateOptions.placeholder}/>

      </div>

      // <div className='snack' style={ style }>
      //   { name }
      // </div>
    );
  }
});

export default DragSource(constants.SNACK, snackSpec, collect)(Snack);
