import React from 'react';
import {
  FormGroup
} from "reactstrap";
import Rule from './Rule'

export default class RuleList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleChange(event) {
    this.props.onChange(event);
  }
  handleAdd(event) {
    this.props.onClickAdd(event);
  }
  handleRemove(event, ruleId) {
    this.props.onClickRemove(event, ruleId);
  }
  render () {
    return (
      <FormGroup>
        {this.props.rules.map((rule) => 
          <Rule 
            size={this.props.size} 
            key={rule.id} 
            fields={this.props.fields} 
            operators={this.props.operators} 
            rule={rule} 
            onChange={this.handleChange}
            onClickAdd={this.handleAdd}
            onClickRemove={this.handleRemove} />,
          this
        )}
      </FormGroup>
    );
  }
}
  