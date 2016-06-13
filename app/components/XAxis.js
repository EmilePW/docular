import React from 'react';
import d3 from 'd3';

class XAxis extends React.Component {
  constructor () {
    super();
  }
  
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    let axisNode  = this.refs.axis;
    let axisFunc = d3.svg.axis().orient("bottom").scale(this.props.scale);
    d3.select(axisNode).call(axisFunc);
  }

  render() {
    return (
      <g
        className="axis"
        ref="axis"
        transform={this.props.translate}>
      </g>
    );
  }
}

export default XAxis;