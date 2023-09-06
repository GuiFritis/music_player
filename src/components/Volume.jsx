import React from 'react';
import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import setDevice from '../utils/device';

export default function Volume() {
	const [{token, playerState, currentDevice}, disppatch] = useStateProvider(); 
	const setVolume = async e => {
		if(playerState) {
			await axios.put('https://api.spotify.com/v1/me/player/volume', {}, {
				params: {
					volume_percent: parseInt(e.target.value),
					device_id: currentDevice?.id
				},
				headers: {
					Authorization: 'Bearer ' + token,
					"Content-Type": "application/json"
				}
			});
			currentDevice.volume_percent = parseInt(e.target.value);
			if(!currentDevice){
				setDevice(token, disppatch); 
			}
		}
	}
  return (
    <Container>
        <input type="range" min={0} max={100} onMouseUp={setVolume}/>
    </Container>
  )
}

const Container = styled.div`
	display: flex;
	justify-content: flex-end;
	align-content: center;
	input {
		width: 15em;
		border-radius: 2em;
		height: 0.5em;
	}
`;