import React, {useEffect} from 'react';
import styled from 'styled-components';
import { BsClockFill } from 'react-icons/bs';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';
import setDevice from '../utils/device';

export default function Body({headerBackground}) {
  const [{token, selectedPlaylistId, selectedPlaylist, currentDevice}, disppatch] = useStateProvider();
  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application.json'
        }
      });  
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a") ? "" : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({track}) => ({
          id: track.id,
          name: track.name, 
          artists: track.artists.map((artist) => artist.name),
          duration: track.duration_ms,
          album: track.album.name,
          image: track.album.images[2].url,
          context_uri: track.album.uri,
          track_number: track.track_number,
        }))
      };
      disppatch({type: reducerCases.SET_PLAYLIST, selectedPlaylist});
    }
    getInitialPlaylist();
  }, [token, disppatch, selectedPlaylistId]);
  const msToTime = (ms) => {
    const minutes = Math.floor(ms/60000);
    const seconds = ((ms%60000)/1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0":"") + seconds;
  };
  const playTrack = async (id, name, artists, image, context_uri, track_number) => {
    const response = await axios.put('https://api.spotify.com/v1/me/player/play/', {
      context_uri,
      offset: {
        position: track_number-1
      },
      position_ms: 0,
      device_id: currentDevice?.id
    }, {
        headers: {
            Authorization: 'Bearer ' + token,
            "Content-Type": "application/json"
        }
    });
    if(!currentDevice){
      setDevice(token, disppatch); 
    }
    if(response.status === 204){
      const currentlyPlaying = {
        id, name, artists, image
      };
      disppatch({type: reducerCases.SET_PLAYING, currentlyPlaying});
      disppatch({type: reducerCases.SET_PLAYER_STATE, playerState: true});
    }
    disppatch({type: reducerCases.SET_PLAYER_STATE, playerState: true});
  }
  return (
    <Container headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="Playlist image" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header-row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>Title</span>
              </div>
              <div className="col">
                <span>Album</span>
              </div>
              <div className="col">
                <span><BsClockFill/></span>
              </div>
            </div>
            <div className="tracks">
              {
                selectedPlaylist.tracks.map(({id, name, artists, image, duration, album, context_uri, track_number}, index) => {
                  return (
                    <div className="row" key={id} onClick={() => playTrack(id, name, artists, image, context_uri, track_number)}>
                      <div className="col">
                        <span>{index+1}</span>
                      </div>
                      <div className="col detail">
                        <img src={image} alt="Track album cover" />
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToTime(duration)}</span>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  .playlist {
    margin: 0 2em;
    display: flex;
    align-items: center;
    gap: 1em;
    .image {
      img{
        height: 15em;
        box-shadow: 0 25px 50px -12px #00000040;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1em;
      height: 15em;
      color: #e0dede;
      .title {
        color: #ffffff;
        font-size: 4em;
        margin: 10px 0;
      }
    }
  }
  .list {
    .header-row{
      display: grid;
      grid-template-columns: .3fr 3fr 2fr .1fr;
      color: #dddcdc;
      margin: 1em 0 .4em;
      position: sticky;
      top: 0vh;
      padding: .7em 3em;
      transition: .3s ease-in-out;
      background: ${({headerBackground}) => headerBackground ? "linear-gradient(to bottom, #000000 60%, transparent)" : "transparent"};
    }
    .tracks {
      margin: 0 2em;
      display: flex;
      flex-direction: column;
      gap: .5em;
      margin-bottom: 5em;
      .row {
        border-radius: 10px;
        padding: .5em 1em;
        display: grid;
        grid-template-columns: .3fr 3.1fr 2fr .1fr;
        &:hover {
          background: #0000008f;
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 3em;
          }
          &.detail {
            display: flex;
            gap: 1em;
            .info {
              display: flex;
              flex-direction: column;
              .name {
                font-size: 1.1em;
                font-weight: bold;
                color: #ffffff;
              }
            }
          }
        }
      }
    }
  }
`;