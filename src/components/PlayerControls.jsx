import React from 'react';
import styled from "styled-components";
import {
    BsFillPlayCircleFill, BsPauseCircleFill, BsSkipEndFill,
    BsSkipStartFill, BsShuffle, BsRepeat, BsRepeat1
} from 'react-icons/bs';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';
import setDevice from '../utils/device';

export default function PlayerControls() {
    const [{token, playerState, currentDevice}, disppatch] = useStateProvider(); 
    const changeTrack = async (type) => {
        const skip = await axios.post('https://api.spotify.com/v1/me/player/'+type, {
            device_id: currentDevice?.id
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": "application/json"
            }
        });
        
        if(skip.status == 204)
        {
            if(!currentDevice){
				setDevice(token, disppatch); 
			} 
            setTimeout(async () => {
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
                        artists: item.artists.map((artist) => artist.name),
                        image: item.album.images[2].url
                    };
                    disppatch({type: reducerCases.SET_PLAYING, currentlyPlaying});
                    disppatch({type: reducerCases.SET_PLAYER_STATE, playerState: response.data.is_playing});
                } else {
                    disppatch({type: reducerCases.SET_PLAYING, currentlyPlaying: null});
                    disppatch({type: reducerCases.SET_PLAYER_STATE, playerState: false});
                }
            }, 100);
        }
    };
    const changeState = async () => {
        const state = playerState ? "pause" : "play";
        const response = await axios.put('https://api.spotify.com/v1/me/player/'+state, {}, {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": "application/json"
            }
        });
        disppatch({type: reducerCases.SET_PLAYER_STATE, playerState: !playerState});
    }
    return (
        <Container>
            <div className="shuffle">
                <BsShuffle/>
            </div>
            <div className="previous" onClick={() => changeTrack("previous")}>
                <BsSkipStartFill/>
            </div>
            <div className="state" onClick={() => changeState()}>
                {playerState ? <BsPauseCircleFill/> : <BsFillPlayCircleFill/>}
            </div>
            <div className="next" onClick={() => changeTrack("next")}>
                <BsSkipEndFill/>
            </div>
            <div className="repeat">
                <BsRepeat/>
            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2em;
    svg {
        color: #c3c3c3;
        transition: .3s ease-in-out;
        &:hover {
            color: #ffffff;
        }
    }
    .state {
        svg {
            color: #ffffff;
        }
    }
    .previous, .next, .state {
        font-size: 2em;
    }
`;
