import React, {useEffect} from 'react'
import {useStateProvider} from "../utils/StateProvider";
import axios from 'axios';
import { reducerCases } from '../utils/Constants';
import styled from 'styled-components';

export default function Playlists() {
    const [{token, playlists}, disppatch] = useStateProvider();
    useEffect(() => {
        const getPlaylistData = async () => {
            const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": "application/json"
                }
            })
            const {items} = response.data;
            const playlists = items.map(({name, id}) => {
                return {name, id};
            });
            disppatch({type: reducerCases.SET_PLAYLISTS, playlists});
        };
        getPlaylistData();
    }, [token, disppatch]);
    const changeCurrentPlaylist = (selectedPlaylistId) => {
        disppatch({type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId});
    }
    return (
        <Container>
            <ul>
                {playlists.map(({name, id}) => {
                    return <li key={id} onClick={() => changeCurrentPlaylist(id)}>{name}</li>
                })}
            </ul>
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: #ffffff66 #d3d3d3;
    &::-webkit-scrollbar{
        background-color: #ffffff66;
        width: 7px;
        height: 7px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #d3d3d3;
    }
`;