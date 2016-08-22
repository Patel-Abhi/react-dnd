import React, { Component } from 'react';
import ShoppingCart from './ShoppingCart';
import Snack from './Snack';
import { DragDropContext } from 'react-dnd';
import HTML5BackEnd from 'react-dnd-html5-backend';

var textSchema = {
  "type": "input",
  "key": "company",
  "templateOptions": {
    "type": "text",
    "placeholder": "Textbox",
    "label": "Company"
  }
}
var radioSchema = {
  "type": "radio",
  "key": "company",
  "templateOptions": {
    "type": "radio",
    "placeholder": "",
    "label": "Company"
  }
}

var Container = React.createClass({
  render() {
    return (
      <div>
        <Snack name='Chips' schema={textSchema} />
        <Snack name='Cupcake'  schema={radioSchema} />
        { /*<Snack name='Donut' schema={textSchema} />
        <Snack name='Doritos' schema={textSchema} />
        <Snack name='Popcorn' schema={textSchema} />*/}
        <ShoppingCart />
      </div>
    );
  }
});


export default DragDropContext(HTML5BackEnd)(Container);
