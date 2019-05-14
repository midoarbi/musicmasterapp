import React,{Component} from 'react';
import Artist from  './components/Artist';
import Tracks from './components/Tracks';
import Search from './components/Search';

const API_ADRESS = 'https://spotify-api-wrapper.appspot.com';


class App extends Component   {

  state = {artist: null, tracks: []}

  
  searchArtist = artistQuery =>
  {
    fetch(`${API_ADRESS}/artist/${artistQuery}`)
    .then(Response => Response.json())
    .then(json => {
     if(json.artists.total>0)
     {
       const artist = json.artists.items[0];
       this.setState({artist});

       fetch(`${API_ADRESS}/artist/${artist.id}/top-tracks`)
       .then(Response => Response.json())
       .then(json => this.setState({tracks: json.tracks}))
       .catch(error => alert(error.message));
     }
    } )
    .catch(error => alert(error.message));
  }
 
  render(){
    return (
      <div className='app'>
      <h2>Music Master</h2>
      <Search searchArtist={this.searchArtist}  />
      <Artist artist={this.state.artist} />
      <Tracks tracks={this.state.tracks} />
      </div>
    );
  }
}

export default App;
