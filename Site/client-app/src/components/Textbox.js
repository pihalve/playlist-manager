import React from 'react';
import {
  FormGroup,
  Label,
  Input
} from "reactstrap";
  
export default class Textbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.props.onChange(event.target.value);
  }
  hasLabel() {
    return !(this.props.label === undefined || this.props.label === null || this.props.label === '');
  }
  render() {
    return (
      <FormGroup>
        {this.hasLabel() && <Label for={this.props.id}>{this.props.label}</Label>}
        <Input type='text' id={this.props.id} defaultValue={this.props.value} placeholder={this.props.placeholder} onChange={this.handleChange} />
      </FormGroup>
    );
  }
}

