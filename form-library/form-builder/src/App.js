import React, { Component } from 'react';
import { render } from "react-dom";

import Form from "react-jsonschema-form-mui";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme,MuiThemeProvider  } from '@material-ui/core/styles'

const theme = createMuiTheme({})

const schema ={
  "definitions": {},
  "type": "object",
  "properties": {
    "multipleChoicesList": {
      "type": "array",
      "title": "A multiple choices list",
      "items": {
        "type": "string",
        "enum": [
          "foo",
          "bar",
          "fuzz",
          "qux"
        ]
      },
      "uniqueItems": true
    },
    "dropdDownValues":{
        "type": "number",
        "enum": [1, 2, 3],
        "enumNames": ["Option 1", "Option 2", "Option 3"]

    },
    "dropdDownValuesMultiple":{
        "type": "array",
        "title":"multiple Dropdown",
        "items": {
            "type": "string",
            "enum": ["foo", "bar", "fuzz", "qux"]
        },
        "options":["foo", "bar", "fuzz", "qux"],
       "uniqueItems": true

    },
    "myField": {
      "type": 'array',
      "title": 'My field multiple options',
      "items": {
        "enum": [
          'foo',
          'bar',
        ],
        "type": 'string'
      },
      "options":["test", "rest", "data"],
      "uniqueItems": true,
      "properties": {}
    }


  }
};

const uiSchema = {
                  "listOfStrings": {
                    "items": {
                      "ui:emptyValue": ""
                    }
                  },
                  "multipleChoicesList": {
                    "ui:widget": "checkboxes",
                    "ui:options": {
                      "inline": true
                    }
                  },
                  "items": {
                    "ui:widget": "checkboxes"
                  },
                  "dropdDownValues": {
                    "ui:widget": "select"
                  },
                  "myField":{
                     "ui:widget": "select",
                      "ui:options":  {
                        "orderable": false
                      }
                  },
                  "dropdDownValuesMultiple":{
                    "ui:widget": "select",
                    "ui:multiple":true,
                    "ui:options": {
                      "multiple":true
                    }
                  },
                  "testing": (props) => {
                    return (
                      <input type="text"
                        className="custom"
                        value={props.value}
                        required={props.required}
                        onChange={(event) => props.onChange(event.target.value)} />
                    );
                  }
                }
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const MyCustomWidget = (props) => {

  return (
        <div className="test">
        <div className="">
          <InputLabel htmlFor="select-multiple">Name</InputLabel>
          <Select
            multiple
            value={props.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={this.MenuProps}
          >
            {names.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={this.names.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>

        </div>
      </div>
  );
};

const widgets = {
  'MyCustomWidget': this.MyCustomWidget
};

const log = (type) => console.log.bind(console, type);
class App extends Component {

  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
                    'name': [],
                  };
    console.log("-----props-----",this.props)
  }

  handleChange(event){
    this.setState({ name: event.target.value });
  };




  render() {

    return (

      <MuiThemeProvider theme={theme}>
      <div className="App">
          <div>
             <Form schema={schema}
              uiSchema={uiSchema}
              onChange={log("changed")}
              onSubmit={log("submitted")}
              onError={log("errors")}
              widgets={widgets} />
          </div>
          <p>Custome one</p>

          <MyCustomWidget name={this.state.name} state={this.state}/> 
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
