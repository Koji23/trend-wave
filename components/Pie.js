import React from 'react';
import ReactDOM from 'react-dom';
import Faux from 'react-faux-dom';
// import d3 from 'd3/build/d3.min.js';

class Pie extends React.Component {
  constructor(props){
    super(props);
    
  }
  componentDidMount () {
    console.log(this.props.data);
    this.updateChart(this.props.data);
  }

  updateChart (data) {
    var width = 450, //960
        height = 450, //500
        radius = Math.min(width, height) / 2;

    //Ordinal scale w/ default domain and colors for range
    var color = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    //create arc data (to define path svg)
    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    //create pie layout order data
    var pie = d3.pie()
        .sort(null)
        .value(function(d){
          return d.population;
        });
    //append both and svg and a g (group) element to the page. Move it over to the middle
    var svg = d3.select('#chart').append('svg')
              .attr('width', width)
              .attr('height', height)
              .append('g')
              .attr('transform', 'translate(' + width / 2 + "," + height / 2 + ')');

    //Apply data to pie and add g's on enter
    var g = svg.selectAll('.arc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc');

    //put a path element in the g, give it a d attribute of the previously defined arc path. Grab its color from the scale range
    g.append('path')
    .attr('d', arc)
    .style('fill', function(d) {return color(d.data.age);});

    //put svg text elements on each g. Use the cenrtroid method to position center of the slice. Shift the dy positioning. Pull text from data
    g.append('text')
    .attr('transform', function(d){return 'translate('+ labelArc.centroid(d) + ')'; })
    .attr('dy', '.35em')
    .attr('dx', '-.8em')
    .attr('font-size', '10px')
    .text(function(d) {return d.data.age;});
  }
  render () {
    return (
      <div id="chart"></div>
    );
  }
}

export default Pie;