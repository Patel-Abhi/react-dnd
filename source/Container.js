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
  "key": "radio",
  "templateOptions": {
    "type": "radio",
    "placeholder": "",
    "label": "Company"
  }
}
var selectSchema = {
  "key": "ram",
  "type": "select",
  "templateOptions": {
    "label": "Ram",
    "valueProp": "name",
    "options": [
      {
        "name": "1 GB",
        "value": "1 GB"
      },
      {
        "name": "2 GB",
        "value": "2 GB"
      },
      {
        "name": "3 GB",
        "value": "3 GB"
      }
    ]
  }
}
var multiCheck = {
  "type": "multiCheckbox",
        "key": "features",
        "templateOptions": {
          "label": "Features",
          "options": [
            {
              "name": "Camera",
              "value": "Camera"
            },
            {
              "name": "WiFi",
              "value": "WiFi"
            },
            {
              "name": "GPS",
              "value": "GPS"
            }
          ],
          "valueProp": "value",
          "labelProp": "name"
        }
      };
var chackBoxSchema = {
  "type": "checkbox",
  "key": "radio",
  "templateOptions": {
    "type": "checkbox",
    "placeholder": "",
    "label": "Check Box"
  }
}
var Container = React.createClass({

  getInitialState() {
    return {
      droppedItems: []
    }
  },

  dropItem(item) {
    //console.log('this'+ item);
    var items = this.state.droppedItems;
    items.push(item);
    this.setState({
      droppedItems: items
    });
  },

  render() {
    return (
      <div>
        <Snack name='Text' schema={textSchema} />
        <Snack name='Radio'  schema={radioSchema} />
        <Snack name='Drop Down' schema={selectSchema} />
        <Snack name='CheckBox' schema={chackBoxSchema} />
        <Snack name='Multi Check' schema={multiCheck} />
        {/*<Snack name='Popcorn' schema={textSchema} />*/}
        <ShoppingCart onDropItem={this.dropItem}/>
      </div>
    );
  }
});


export default DragDropContext(HTML5BackEnd)(Container);
