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

let fakeServerData = {
  user: {
    name: 'Anders',
    playlists: [
      {
        name: 'Summer hits',
        songs: [
          {name: 'glad songen', duration: 1500},
          {name: 'hei hei Monika', duration: 2000},
          {name: 'Ja vi elsker', duration: 2200}
        ]
      },

      {
        name: 'Winter hits',
        songs: [
          {name: 'glad songen', duration: 1500},
          {name: 'hei hei Monika', duration: 2000},
          {name: 'Ja vi elsker', duration: 2200}
        ]
      },

      {
        name: 'Cool playlist',
        songs: [
          {name: 'glad songen', duration: 1500},
          {name: 'hei hei Monika', duration: 2000},
          {name: 'Ja vi elsker', duration: 2200}
        ]
      },
    ]
  }
}

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{width: '40%', display: 'inline-block'}}>
        <h4>{this.props.playlists &&
             this.props.playlists.length}</h4>
      </div>
    )
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
      <div style={{width: '40%', display: 'inline-block'}}>
        <h4>{Math.round(totalDuration/60)} Hours</h4>
      </div>
    )
  }
}

class Filter extends Component {
  render() {
    return (
      <div>
        <input placeholder='Search' onKeyUp={event =>
          this.props.onTextChange(event.target.value)}/>
      </div>
    )
  }
}

class Playlist extends Component {
  render() {
    return (
      <div style={{...cardStyle, backgroundColor: 'white'}}>
        <img/>
        <h4>{this.props.playlist.name}</h4>
        <ul>
          {this.props.playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    )
  }
}



class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: '',
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData})
    }, 1500)
  }
  render() {
    return (
      <div className="App">
        {this.state.serverData.user ?
          <div>
            <h2>{this.state.serverData.user.name}'s Playlist</h2>
            <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
            <HoursCounter playlists={this.state.serverData.user.playlists}/>
            <Filter onTextChange={text => this.setState({filterString: text})}/>
            {this.state.serverData.user.playlists.filter(playlist =>
              playlist.name.toLowerCase().includes(
                this.state.filterString.toLowerCase())
            ).map(playlist =>
              <Playlist playlist={playlist}/>
            )}

        </div> : 'loading...'
      }
      </div>
    );
  }
}

export default App;
