import React, { useEffect } from 'react';
import styled from "styled-components";
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

export default function CurrentTrack() {
    const [{token, currentlyPlaying}, disppatch] = useStateProvider();
    useEffect(() => {
        const getCurrentTrack = async () => {
            const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": "application/json"
                }
            });
            if(response.data !== "") {
                const {item} = response.data;
                const currentlyPlaying = {
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((a) => a.name),
                    image: item.album.images[2].url
                };
                disppatch({type: reducerCases.SET_PLAYING, currentlyPlaying});
                disppatch({type: reducerCases.SET_PLAYER_STATE, playerState: response.data.is_playing});
            }
        };
        getCurrentTrack();
    }, [token, disppatch]);
  return (
    <Container>
        {
            currentlyPlaying && (
                <div className="track">
                    <div className="track-image">
                        <img src={currentlyPlaying.image} alt="Currently playing track album cover" />
                    </div>
                    <div className="track-info">
                        <h4>{currentlyPlaying.name}</h4>
                        <h6>{currentlyPlaying.artists.join(", ")}</h6>
                    </div>
                </div>
            )
        }
    </Container>
  )
}

const Container = styled.div`
    .track {
        display: flex;
        align-items: center;
        gap: 1em;
        padding: .6em .5em;
        .track-image{
            img {
                height: calc(12vh - 1.2em);
                border-radius: 5px;
                overflow: hidden;
            }
        }
        .track-info {
            display: flex;
            flex-direction: column;
            gap: 0.3em;
            h4 {
                color: #ffffff;
            }
            h6 {
                color: #c3c3c3;
            }
        }
    }
`;