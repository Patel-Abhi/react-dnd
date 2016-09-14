import React, { Component } from 'react';
import ShoppingCart from './ShoppingCart';
import Snack from './Snack';
import { DragDropContext } from 'react-dnd';
import HTML5BackEnd from 'react-dnd-html5-backend';

var textSchema = {
  "type": "input",
  "key": "textbox1",
  "templateOptions": {
    "type": "text",
    "placeholder": "Textbox",
    "label": "Text Box",
    "isRequired": false
  }
}

var textAreaSchema = {
  "type": "textArea",
  "key": "textArea",
  "templateOptions": {
    "type": "text",
    "placeholder": "Text Area",
    "label": "Text Area",
    "isRequired": false
  }
}
var radioSchema = {
  "type": "radio",
  "key": "radio1",
  "templateOptions": {
    "label": "Radio",
    "options": [
      {
        "name": "Option 1",
        "value": "value1"
      },
      {
        "name": "Option 2",
        "value": "value2"
      }
    ],
    "valueProp": "value",
    "labelProp": "name"
  }
};
var selectSchema = {
  "key": "select",
  "type": "select",
  "templateOptions": {
    "label": "select options",
    "valueProp": "name",
    "options": [
      {
        "name": "Option 1",
        "value": "value1"
      },
      {
        "name": "Option 2",
        "value": "value2"
      },
      {
        "name": "Option 3",
        "value": "value3"
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
        "name": "Option 1",
        "value": "value1"
      },
      {
        "name": "Option 2",
        "value": "value2"
      },
      {
        "name": "Option 3",
        "value": "value3"
      }
    ],
    "valueProp": "value",
    "labelProp": "name"
  }
};
var chackBoxSchema = {
  "type": "checkbox",
  "key": "checkbox",
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
    console.log(item)

  },

  render() {
    return (
      <div>
        <Snack name='Text' schema={textSchema} />
        <Snack name='Popcorn' schema={textAreaSchema} />
        <Snack name='Radio'  schema={radioSchema} />
        <Snack name='Drop Down' schema={selectSchema} />
        <Snack name='CheckBox' schema={chackBoxSchema} />
        <Snack name='Multi Check' schema={multiCheck} />
        {/*
        <div className="container">
          <div className="form-group">
              <label htmlFor="usr">Name: </label>
              <input type="text" className="form-control"/>
            </div>
        </div>  
         */}
        <ShoppingCart onDropItem={this.dropItem}/>
        <div className="pull-right">
          <button className="btn btn-default">Cancel</button>
          <button className="btn btn-primary" >Save</button>
        </div>
        <div>
        </div>
      </div>
    );
  }
});


export default DragDropContext(HTML5BackEnd)(Container);
