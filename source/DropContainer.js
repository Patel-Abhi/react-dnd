import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import constants from './constants';
var Wrapper = require('../form-elements/ControlWrapper');


// Spec object definiction for DropContainer 
const DropContainerSpec = {
  drop(connect, monitor, component) {
    //var newKey = (monitor.getItem().schema.key) + new Date().getMilliseconds();
    var newKey = monitor.getItem().schema.key + new Date().getMilliseconds();
    var draggedControl = Object.assign({ key: newKey }, monitor.getItem().schema);
    draggedControl.key = newKey;
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

var placeholder = document.createElement("li");
placeholder.className = "placeholder";
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
    console.log(toRemove);
    var ctrls = this.state.controls.filter(x => x.key !== toRemove.key)
    this.setState({
      controls: ctrls
    });
    this.props.onDropItem(this.state.controls);
  },

  // update a control
  updateSchema(index, item) {
    var obj = this.state.controls.map((data, i) => {
      if (data.key == index) {
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
  dragStart(e){    
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html",e.currentTarget);
  },
  dragEnd(e){
    console.log('drag end');
    console.log(this.dragged)
   this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(placeholder);
    // Update data
    var data = this.state.controls;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if(from < to) to--;
    if(this.nodePlacement == "after") to++;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({controls: data});
  },
  dragOver: function(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if(e.target.className == "placeholder") return;
    this.over = e.target;
    // Inside the dragOver method
    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;
    var parent = e.target.parentNode;
    
    if(relY > height) {
      this.nodePlacement = "after";
      parent.insertBefore(placeholder, e.target.nextElementSibling);
    }
    else if(relY < height) {
      this.nodePlacement = "before"
      parent.insertBefore(placeholder, e.target);
    }
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
      <div className='shopping-cart' style={style}>
        <ul style={listStyle} onDragOver={this.dragOver}>
          {
            this.state.controls.length > 0 ?
              this.state.controls.map((item, i) =>
                (
                  <li data-id={i} draggable="true" key={i} onDragStart={this.dragStart} onDragEnd = {this.dragEnd}>
                    <Wrapper key={i} schema={item} onDelete={this.deleteControl} updateSchema={this.updateSchema} />
                  </li>
                )
              )
              : <li draggable="true">Drop Components Here</li>
          }
        </ul>
      </div>
    );
  }
});

export default DropTarget(constants.FormElement, DropContainerSpec, collect)(DropContainer);
