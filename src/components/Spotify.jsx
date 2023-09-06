import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';
import setDevice from '../utils/device';

export default function Spotify() {
    const [{token, currentDevice}, disppatch] = useStateProvider();
    const bodyRef = useRef();
    const [navBackground, setNavBackground] = useState(false);
    const [headerBackground, setHeaderBackground] = useState(false);
    const bodyScrolled = () => {
        setNavBackground(bodyRef.current.scrollTop >= 10);
        setHeaderBackground(bodyRef.current.scrollTop >= 268);    
    }
    useEffect(() => {
        const getUserInfo = async () => {
            const {data} = await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });
            const userInfo = {
                id: data.id,
                name: data.display_name
            }
            disppatch({type: reducerCases.SET_USER, userInfo});
            if(!currentDevice){
				setDevice(token, disppatch); 
			}         
        }        
        getUserInfo();
    }, [disppatch, token]);
    return (
        <Container>
            <div className='spotify-body'>
                <Sidebar/>
                <div className="content">
                    <Navbar navBackground={navBackground}/>
                    <div className="content-body" ref={bodyRef} onScroll={bodyScrolled}>
                        <Body headerBackground={headerBackground} />
                    </div>
                </div>
            </div>
            <footer className="spotify-footer">
                <Footer/>
            </footer>
        </Container>
    )
}

const Container = styled.div`
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
    display: grid;
    grid-template-rows: 88vh 12vh;
    .spotify-body{
        display: grid;
        grid-template-columns: 15vw 85vw;
        height: 100%;
        width: 100%;
        overflow-y: hidden;
        .content{
            height: 100%;
            width: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            .content-body {
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
            }
        }
    }
    
`;
