import React from 'react';
import {
  Row,
  Col
} from "reactstrap";
import Dropdown from './Dropdown'
import Textbox from './Textbox'

export default class Rule extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e, name) {
    const value = e;
    const ruleId = this.props.rule.id;
    this.props.onChange({ruleId, name, value});
  }
  render() {
    return (
      <Row>
        <Col xs='3'><Dropdown list={this.props.fields} selected={this.props.rule.field} onChange={(e) => this.handleChange(e, 'field')} /></Col>
        <Col xs='3'><Dropdown list={this.props.operators} selected={this.props.rule.operator} onChange={(e) => this.handleChange(e, 'operator')} /></Col>
        <Col xs='6'><Textbox value={this.props.rule.value} onChange={(e) => this.handleChange(e, 'value')} /></Col>
      </Row>
    );
  }
}
