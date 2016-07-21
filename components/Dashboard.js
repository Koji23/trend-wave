import React from 'react';
import Pie from './Pie';
import Tab from './Tab';

import {Grid, Row, Col, Clearfix, Panel, Well, Button} from 'react-bootstrap';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Image, Jumbotron} from 'react-bootstrap';


class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      trends: ['a', 'b', 'c'],
      data:[
        {age: '5', population: 2704659},
        {age: '5-13', population: 4499890},
        {age: '14-17', population: 2159981},
        {age: '18-24', population: 3853788},
        {age: '25-44', population: 14106543},
        {age: '45-64', population: 8819342},
        {age: '≥65', population: 612463}
      ],
      publicSentiment: '',
      emotionalFeedback: '',
      trendHistory: '',
      representativeTweet: '',
      representativeNewsSource: ''
    }
  }

  fetchData () {
    var context = this;
    $.ajax({
      method:'GET',
      url:'http://localhost:3000/trends',
      contentType: "application/json",
    })
    .done(function(data){
      context.setState({
        data: data.data,
        publicSentiment: data.publicSentiment,
        emotionalFeedback: '',
        trendHistory: '',
        representativeTweet: '',
        representativeNewsSource: ''
      })
      console.log(this.state);
    });
  }


  render () {
    return (
      <Grid>
        <Row>
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">Trend Wave</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight="true">
              <NavDropdown eventKey={1} title="Current Trends" id="basic-nav-dropdown" >
                <MenuItem eventKey={1.1} >Select Trend</MenuItem>
                <MenuItem divider />
                <MenuItem />
                {
                  this.state.trends.map(function(trend, index) {
                    var eKey = Number('1.' + (index + 1));
                    return <MenuItem eventKey={eKey} >{trend}</MenuItem>
                  })
                }
              </NavDropdown>
            </Nav>
          </Navbar>
        </Row>
        <Row>
          <Col xs={6} md={4}><Tab info={this.state.publicSentiment} header="Public Sentiment" sub="(Twitter Sentiment)"/></Col>
          <Col xs={6} md={4}><Tab info={this.state.emotionalFeedback} header="Emotional Feedback" sub="(Facebook Reactions)"/></Col>
          <Col xsHidden md={4}><Tab info={this.state.trendHistory} header="Trend History" sub="(Need to figure out this data)"/></Col>
        </Row>
        <Row>
          <Col md={6} mdPush={6}>
            <Row>  
              <Tab info={this.state.trendHistory} header="Representative Tweet" sub="(Need to figure out this data)" />
            </Row>
            <Row>
              <Tab info={this.state.trendHistory} header="Representative News Source" sub="(Need to figure out this data)" />
            </Row>
          </Col>
          <Col md={6} mdPull={6}>
            <Pie data={this.state.data}/>
            <Button bsStyle="primary" bsSize="large" onClick={this.fetchData.bind(this)} block>Update Chart  </Button>
          </Col>
        </Row>
        <Row>

        </Row>
        <Row>
          <Jumbotron>

          </Jumbotron>
        </Row>
      </Grid>
    );
  }
}

export default Dashboard;