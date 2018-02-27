import React, { Component } from 'react';
import './App.css';

let cardStyle = {
  textDecoration: 'none',
  width: '30%',
  display: 'inline-block',
  listStyle: 'none',
  margin: '10px',
  borderRadius: '5px'
};

class Aggregate extends Component {
  render() {
    return (
      <div style={{width: '40%', display: 'inline-block'}}>
        <h4>Number text</h4>
      </div>
    )
  }
}

class Filter extends Component {
  render() {
    return (
      <div>
        <input placeholder='Search'></input>
      </div>
    )
  }
}

class Playlist extends Component {
  render() {
    return (
      <div style={{...cardStyle, backgroundColor: 'white'}}>
        <img/>
        <h4>Title</h4>
        <ul>
          <li>Sang 1</li>
          <li>Sang 2</li>
          <li>Sang 3</li>
        </ul>
      </div>
    )
  }
}



class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Playlist</h2>

        <Aggregate/>
        <Aggregate/>
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
      </div>
    );
  }
}

export default App;
