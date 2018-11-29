import React from 'react';
import {
  Button,
  Row,
  Col
} from "reactstrap";
import Dropdown from './Dropdown'
import Textbox from './Textbox'

export default class Rule extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleChange(e, name) {
    const value = e;
    const ruleId = this.props.rule.id;
    this.props.onChange({ruleId, name, value});
  }
  handleAdd(event) {
    this.props.onClickAdd(event);
  }
  handleRemove(event) {
    const ruleId = this.props.rule.id;
    this.props.onClickRemove(event, ruleId);
  }
  render() {
    return (
      <Row>
        <Col xs='3'><Dropdown size={this.props.size} list={this.props.fields} selected={this.props.rule.field} onChange={(e) => this.handleChange(e, 'field')} /></Col>
        <Col xs='3'><Dropdown size={this.props.size} list={this.props.operators} selected={this.props.rule.operator} onChange={(e) => this.handleChange(e, 'operator')} /></Col>
        <Col xs='4'>
          <Textbox size={this.props.size} value={this.props.rule.value} onChange={(e) => this.handleChange(e, 'value')} />
        </Col>
        <Col xs='2'>
          <Button color='secondary' size={this.props.size} onClick={this.handleAdd}>
            <span className='oi oi-plus' title='Add' aria-hidden='true'></span>
          </Button>{' '}
          <Button color='secondary' size={this.props.size} onClick={this.handleRemove}>
            <span className='oi oi-minus' title='Remove' aria-hidden='true'></span>
          </Button>
        </Col>
      </Row>
    );
  }
}
