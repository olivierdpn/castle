import React, { Component } from 'react';
import './App.css';
var data1 = require('./StarredRestaurant');
var fs = require('fs');

class App extends Component {
  
   
  
  render() {
    var data = data1;
    return (

        <div>{JSON.stringify(data, null, 2) }</div>
   
    );
  }
}

export default App;
