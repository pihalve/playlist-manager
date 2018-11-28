import React from 'react';
import {
  FormGroup
} from "reactstrap";
import Rule from './Rule'

export default class RuleList extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {rules: [
        {id: 0, field: 'Year', operator: 'is', value: '2018'},
        {id: 1, field: 'Artist', operator: 'starts with', value: ''},
        {id: 2, field: 'Comments', operator: 'contains', value: ''}]};
    }
    handleChange(event) {
      //console.log('RuleList says: ' + event.field + '|' + event.operator + '|' + event.value);
      console.log('Rulelist says: ' + event.ruleId + ':' + event.name + '=' + event.value);
      const rules = this.state.rules;
      rules[event.ruleId][event.name] = event.value;
      //this.setState({[event.name]: event.value});
      this.setState({rules: rules});
      //this.props.onChange({value: event.value});
    }
    render () {
      return (
        <FormGroup>
          {this.state.rules.map((rule) => 
            <div key={rule.id}>
              <Rule key={rule.id} fields={this.props.fields} operators={this.props.operators} rule={rule} onChange={this.handleChange} />
              <span>{this.state.rules[rule.id].field}</span>
            </div>,
            this
          )}
        </FormGroup>
      );
    }
  }
  