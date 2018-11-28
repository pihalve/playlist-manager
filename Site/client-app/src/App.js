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
