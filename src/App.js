import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

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
          {name: 'hei hei Monika', duration: 3000},
          {name: 'Ja vi elsker', duration: 2200}
        ]
      }
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
    let playlist = this.props.playlist
    return (
      <div style={{...cardStyle, backgroundColor: 'white'}}>
        <img src={playlist.imageUrl} style={{width: '160px'}}/>
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
    const parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;


    fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))


    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { 'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
        playlists: data.items.map(item => {
          console.log(data.items)
          return{
            name: item.name,
            imageUrl: item.images[0].url,
            songs: []
          }
        })
      }))

  }

  render() {

    let playlistToRender =
      this.state.user &&
      this.state.playlists
      ? this.state.playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase()))
      : []

    return (
      <div className="App">
        {this.state.user ?
          <div>
            <h2>{this.state.user.name}'s Playlist</h2>

            <PlaylistCounter playlists={playlistToRender}/>
            <HoursCounter playlists={playlistToRender}/>
            <Filter onTextChange={text => this.setState({filterString: text})}/>
            {playlistToRender.map(playlist =>
              <Playlist playlist={playlist}/>
            )}

        </div> : <button onClick={() => window.location = 'http://localhost:8888/login'}
          style={{
            padding: '20px',
            'font-size': '50px',
            marginTop: '20px'}}>Sign in with Spotify</button>
      }
      </div>
    );
  }
}

export default App;
