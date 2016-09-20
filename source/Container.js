import React, { Component } from 'react';
import ShoppingCart from './ShoppingCart';
import FormElement from './FormElement';
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
      name: '',
      fields: []
    }
  },

  dropItem(item) {
    var controls = item;
    this.setState({
      fields: controls
    });
  },
  handleChange(e) {
    this.setState({
      name: e.target.value
    })
  },
  displaySchema() {
    console.log(this.state);
  },
  render() {
    return (
      <div className="row">
        <div className="col-sm-9">
          <div className="row">
            <div className="col-sm-12">
              <label htmlFor="usr">Name: </label>
              <input type="text" className="form-control" onChange={this.handleChange}/>
            </div>
          </div>
          <ShoppingCart onDropItem={this.dropItem}/>
          <div className="pull-right">
            <button className="btn btn-default">Cancel</button>
            <button className="btn btn-primary" onClick={this.displaySchema}>Save</button>
          </div>
        </div>
        <div className="col-sm-3">
          <FormElement name='Text' schema={textSchema} />
          <FormElement name='TextArea' schema={textAreaSchema} />
          <FormElement name='Radio'  schema={radioSchema} />
          <FormElement name='Drop Down' schema={selectSchema} />
          <FormElement name='CheckBox' schema={chackBoxSchema} />
          <FormElement name='Multi Check' schema={multiCheck} />
        </div>
      </div>
    );
  }
});


export default DragDropContext(HTML5BackEnd)(Container);
