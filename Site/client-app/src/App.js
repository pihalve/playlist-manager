import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Row,
  Col,
  Form,
  Button
} from 'reactstrap';
import Textbox from './components/Textbox'
import RuleList from './components/RuleList'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const rules = [
      {id: 0, field: 'Year', operator: 'is', value: '2018'},
      {id: 1, field: 'Artist', operator: 'starts with', value: ''},
      {id: 2, field: 'Comments', operator: 'contains', value: ''}];
    this.state = {
      playlistName: '',
      rules: rules,
      ruleNextId: rules.length
    };
    this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
    this.handleRuleListChange = this.handleRuleListChange.bind(this);
    this.handleRuleListAdd = this.handleRuleListAdd.bind(this);
    this.handleRuleListRemove = this.handleRuleListRemove.bind(this);
  }
  getMp3Tags() {
    return ['Artist','Album','Comments','Year'];
  }
  getOperators() {
    return ['contains','does not contain','is','is not','starts with','ends with'];
  }
  handlePlaylistNameChange(event) {
    this.setState({playlistName: event});
  }
  handleRuleListChange(event) {
    const rules = this.state.rules;
    var ruleIndex = rules.findIndex(function(rule) {return rule.id === event.ruleId});
    rules[ruleIndex][event.name] = event.value;
    this.setState({rules: rules});
  }
  handleRuleListAdd() {
    const rules = this.state.rules;
    var ruleNextId = this.state.ruleNextId;
    rules.push({
      id: ruleNextId,
      field: this.getMp3Tags()[0],
      operator: this.getOperators()[0],
      value: ''
    });
    ruleNextId++;
    this.setState({
      rules: rules,
      ruleNextId: ruleNextId
    });
  }
  handleRuleListRemove(event, ruleId) {
    const rules = this.state.rules;
    var indexToRemove = rules.findIndex(function(rule) {return rule.id === ruleId});
    rules.splice(indexToRemove, 1);
    if (rules.length < 1) {
      this.handleRuleListAdd();
    } else {
      this.setState({
        rules: rules
      });
    }
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Playlist Manager</NavbarBrand>
        </Navbar>
        <Form>
          <Row>
            <Col xs='3'></Col>
            <Col xs='3'><Textbox size='sm' id='playlistName' label='Playlist name' onChange={this.handlePlaylistNameChange} /></Col>
            <Col xs='6'></Col>
          </Row>
          <Row>
            <Col xs='3'></Col>
            <Col xs='6'>
              <RuleList size='sm' fields={this.getMp3Tags()} operators={this.getOperators()} rules={this.state.rules} 
                onChange={this.handleRuleListChange}
                onClickAdd={this.handleRuleListAdd}
                onClickRemove={this.handleRuleListRemove} />
            </Col>
            <Col xs='3'></Col>
          </Row>
          <Row>
            <Col xs='3'></Col>
            <Col xs='6'>
              <Button color='primary' size='sm'>Save</Button>{' '}
              <Button color='primary' size='sm'>Cancel</Button>
            </Col>
            <Col xs='3'></Col>
          </Row>
        </Form>
        <div>
          {this.state.rules.map((rule) => 
            <Row key={rule.id}>
              <Col xs='3'></Col>
              <Col xs='6'>
                <Row>
                  <Col>{rule.id}</Col>
                  <Col>{rule.field}</Col>
                  <Col>{rule.operator}</Col>
                  <Col>{rule.value}</Col>
                </Row>
              </Col>
              <Col xs='3'></Col>
            </Row>
          )}
        </div>
      </div>
    );
  }
}

export default App;
