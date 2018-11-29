import React from 'react';
import {
  Input
} from "reactstrap";

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    //console.log('Dropdown says: ' + event.target.value);
    this.props.onChange(event.target.value);
  }
  // setSelected(item) {
  //   return item === undefined || item === null || item === '' ? 'Options' : item;
  // }
  render() {
    return (
      <Input type='select' size={this.props.size} value={this.props.selected} onChange={this.handleChange}>
        {this.props.list.map((item) => <option key={item} value={item}>{item}</option>)}
      </Input>
    );
  }
}
