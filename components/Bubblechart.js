import React from 'react';
import ReactDOM from 'react-dom';
import Faux from 'react-faux-dom';
// import d3 from 'd3/build/d3.min.js';

class Pie extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount () {
    
  }
  render () {
    return (
      <div>
        <div id="chart"></div>
        <button ></button>
      </div>
    );
  }
}

export default Pie;