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
    this.state = {
      field: this.props.rule.field,
      operator: this.props.rule.operator,
      value: this.props.rule.value
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e, name) {
    const value = e;
    const ruleId = this.props.rule.id;
    this.setState({[name]: value});
    this.props.onChange({ruleId, name, value});
  }
  render() {
    return (
      <Row>
        <Col xs='3'><Dropdown list={this.props.fields} selected={this.state.field} onChange={(e) => this.handleChange(e, 'field')} /></Col>
        <Col xs='3'><Dropdown list={this.props.operators} selected={this.state.operator} onChange={(e) => this.handleChange(e, 'operator')} /></Col>
        <Col xs='6'><Textbox value={this.state.value} onChange={(e) => this.handleChange(e, 'value')} /></Col>
      </Row>
    );
  }
}
