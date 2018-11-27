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
    this.state = {selected: props.selected};
    this.handleChange = this.handleChange.bind(this);
    // this.toggle = this.toggle.bind(this);
    // this.state = {isOpen: false};
  }
  handleChange(event) {
    console.log('Dropdown says: ' + event.value);
    this.setState({selected: event.target.value});
    this.props.onChange(event.target.value);
  }
  setSelected(item) {
    return item === undefined || item === null || item === '' ? 'Options' : item;
  }
  // toggle() {
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   });
  // }
  render() {
    /* <select value={this.state.value} onChange={this.handleChange}>
      {this.props.list.map((item) => <option key={item} value={item}>{item}</option>)}
    </select> */
    return (
      <UncontrolledDropdown size='sm' style={{width:'100%'}}>
        <DropdownToggle caret style={{width:'100%'}}>
            {this.setSelected(this.state.selected)}
        </DropdownToggle>
        <DropdownMenu style={{width:'100%'}}>
          {this.props.list.map((item) => 
            <DropdownItem key={item} value={item} onClick={this.handleChange}>{item}</DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

class Rule extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleOperatorChange = this.handleOperatorChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }
  handleFieldChange(event) {
    this.props.onChange({field: event});
  }
  handleOperatorChange(event) {
    this.props.onChange({operator: event});
  }
  handleValueChange(event) {
    this.props.onChange({value: event});
  }
  render() {
    return (
      <Row>
        <Col sm='3'><Dropdown list={this.props.fields} selected={this.props.rule.field} onChange={this.handleFieldChange} /></Col>
        <Col sm='3'><Dropdown list={this.props.operators} selected={this.props.rule.operator} onChange={this.handleOperatorChange} /></Col>
        <Col sm='6'><Textbox value={this.props.rule.value} onChange={this.handleValueChange} /></Col>
      </Row>
    );
  }
}

class RuleList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {rules: [
      {id: 1, field: 'Year', operator: 'is', value: '2018'},
      {id: 2, field: 'Artist', operator: 'starts with', value: ''},
      {id: 3, field: 'Comments', operator: 'contains', value: ''}]};
  }
  handleChange(event) {
    console.log('RuleList says: ' + event.value);
    //this.props.onChange({value: event.value});
  }
  render () {
    return (
      <FormGroup>
        {this.state.rules.map((rule) => 
          <Rule key={rule.id} fields={this.props.fields} operators={this.props.operators} rule={rule} onChange={this.handleChange} />,
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
            <Col sm='3'></Col>
            <Col sm='3'><Textbox id='playlistName' label='Playlist name' onChange={this.handlePlaylistNameChange} /></Col>
            <Col sm='6'></Col>
          </Row>
          <Row>
            <Col sm='3'></Col>
            <Col sm='6'><RuleList fields={mp3Tags} operators={operators} /></Col>
            <Col sm='3'></Col>
          </Row>
          <Row>
            <Col sm='3'></Col>
            <Col sm='6'>
              <Button>Save</Button>
              <Button style={{marginLeft:'5px'}}>Cancel</Button>
            </Col>
            <Col sm='3'></Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default App;
