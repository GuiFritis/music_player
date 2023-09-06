import React from 'react';
import styled from 'styled-components';
import {BsFillHouseDoorFill, BsSearch, BsFillJournalBookmarkFill} from 'react-icons/bs';
import Playlists from './Playlists';

export default function Sidebar() {
    return (
        <Container>
            <div className="top-links">
                <div className="logo">
                    <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png' alt='Spotify Logo'/>
                </div>
                <ul>
                    <li><BsFillHouseDoorFill/> <span>Home</span></li>
                    <li><BsSearch/> <span>Search</span></li>
                    <li><BsFillJournalBookmarkFill/> <span>Your Library</span></li>
                </ul>
            </div>
            <Playlists/>
        </Container>
    )
}

const Container = styled.div`
    background-color: #000000aa;
    padding: 10px 0px;
    color: #59f8fd;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    .top-links {
        display: flex;
        flex-direction: column;
    }
    .logo {
        img {
            width: 100%;
        }
    }
    ul {
        margin-top: 0px;
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 1em;
        li {
            display: flex;
            align-items: center;
            gap: .6ch;
            cursor: pointer;
            transition: .2s;
            font-size: 1.2em;
            &:hover {
                color: #ffffff;
                text-shadow: 0px 0px 3px #59f8fd;
            }
        }
    }
    div {
        padding: 0px 10px;
    }
`;