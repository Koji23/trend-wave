import React from 'react';
import Pie from './Pie';

class App extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    return (
      <div>
        <Pie />
      </div>
    );
  }
}

export default App;