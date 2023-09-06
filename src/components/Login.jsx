import React from 'react'
import styled from 'styled-components';

export default function Login() {
    const handleClick = () => {
        const clientId = "845eb27b8c1a46ae9d040c0c65e4b618";
        const redirectURL = "http://localhost:3000/";
        const apiUrl = "https://accounts.spotify.com/authorize";
        const scope = [
            'user-read-email', 
            'user-read-private', 
            'user-modify-playback-state', 
            'user-read-playback-state', 
            'user-read-currently-playing'
        ];
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
    };

    return (
        <Container>
            <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png' alt='Spotify Logo'/>
            <button onClick={handleClick}>Connect to Spotify</button>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
    height: 100%;
    max-height: 100vh;
    max-width: 100vw;
    padding-top: 20px;
    img {
        height: 50vh;
        width: auto;
        filter: drop-shadow(0px 0px 10px #59f8fd);
    }
    button {
        padding: .5em 1em;
        border-radius: 50px;
        outline: none;
        border: none;
        background: #f8f8f8;
        box-shadow: 0px 0px 5px 1px #59f8fd;
        color: #50d0d8;
        font-size: 1.5em;
        cursor: pointer;
        transition: .2s;
    }
    button:hover{
        box-shadow: 0px 0px 10px 2px #59f8fd;
        text-shadow: 0px 0px 2px #59f8fd;
    }
`;
