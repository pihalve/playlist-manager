import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  Button,
  Label,
  Input
} from "reactstrap";
import './App.css';

class Textbox extends React.Component {
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

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {selected: props.selected};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    console.log('Dropdown says: ' + event.target.value);
    // this.setState({selected: event.target.value});
    this.props.onChange(event.target.value);
  }
  // setSelected(item) {
  //   return item === undefined || item === null || item === '' ? 'Options' : item;
  // }
  render() {
    return (
      <Input type='select' value={this.props.selected} onChange={this.handleChange}>
        {this.props.list.map((item) => <option key={item} value={item}>{item}</option>)}
      </Input>
      // <UncontrolledDropdown size='sm' style={{width:'100%'}}>
      //   <DropdownToggle caret style={{width:'100%'}}>
      //       {this.setSelected(this.state.selected)}
      //   </DropdownToggle>
      //   <DropdownMenu style={{width:'100%'}}>
      //     {this.props.list.map((item) => 
      //       <DropdownItem key={item} value={item} onClick={this.handleChange}>{item}</DropdownItem>
      //     )}
      //   </DropdownMenu>
      // </UncontrolledDropdown>
    );
  }
}

class Rule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      field: this.props.rule.field,
      operator: this.props.rule.operator,
      value: this.props.rule.value
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleOperatorChange = this.handleOperatorChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }
  handleFieldChange(event) {
    const ruleId = this.props.rule.id;
    const name = 'field';
    const value = event;
    this.setState({field: value});
    this.props.onChange({ruleId, name, value});
  }
  handleOperatorChange(event) {
    const ruleId = this.props.rule.id;
    const name = 'operator';
    const value = event;
    this.setState({operator: value});
    this.props.onChange({ruleId, name, value});
  }
  handleValueChange(event) {
    const ruleId = this.props.rule.id;
    const name = 'value';
    const value = event;
    this.setState({value: value});
    this.props.onChange({ruleId, name, value});
  }
  render() {
    return (
      <Row>
        <Col xs='3'><Dropdown list={this.props.fields} selected={this.state.field} onChange={this.handleFieldChange} /></Col>
        <Col xs='3'><Dropdown list={this.props.operators} selected={this.state.operator} onChange={this.handleOperatorChange} /></Col>
        <Col xs='6'><Textbox value={this.state.value} onChange={this.handleValueChange} /></Col>
      </Row>
    );
  }
}

class RuleList extends React.Component {
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
          <div>
            <Rule key={rule.id} fields={this.props.fields} operators={this.props.operators} rule={rule} onChange={this.handleChange} />
            <span>{this.state.rules[rule.id].field}</span>
          </div>,
          this
        )}
      </FormGroup>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {playlistName: ''};
    this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
  }
  handlePlaylistNameChange(event) {
    this.setState({playlistName: event});
  }
  render() {
    const mp3Tags = ['Artist','Album','Comments','Year'];
    const operators = ['contains','does not contain','is','is not','starts with','ends with'];
    return (
      // <div className="App">
      //   <RuleList mp3Tags={mp3Tags} operators={operators} />
      // </div>
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Playlist Manager</NavbarBrand>
        </Navbar>
        <Form>
          <Row>
            <Col xs='3'></Col>
            <Col xs='3'><Textbox id='playlistName' label='Playlist name' onChange={this.handlePlaylistNameChange} /></Col>
            <Col xs='6'></Col>
          </Row>
          <Row>
            <Col xs='3'></Col>
            <Col xs='6'><RuleList fields={mp3Tags} operators={operators} /></Col>
            <Col xs='3'></Col>
          </Row>
          <Row>
            <Col xs='3'></Col>
            <Col xs='6'>
              <Button>Save</Button>
              <Button style={{marginLeft:'5px'}}>Cancel</Button>
            </Col>
            <Col xs='3'></Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default App;
