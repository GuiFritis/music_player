import React from 'react';
import styled from 'styled-components';
import { BsSearch, BsPerson } from 'react-icons/bs';
import { StateProvider, useStateProvider } from '../utils/StateProvider';

export default function Navbar({navBackground}) {
  const [{userInfo}] = useStateProvider();
  return (
    <Container navBackground={navBackground}>
      <div className="search-bar">
        <BsSearch/>
        <input type='text' placeholder='Artists, songs or podcasts'/>
      </div>
      <div className="avatar">
        <a href="#">
          <BsPerson/>
          <span>{userInfo?.name}</span>
        </a>
      </div>
    </Container>
  )
}

const Container = styled.div`
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2em;
  height: 3vh;
  position: sticky;
  top: 0px;
  transition: 0.2s ease-in-out;
  background-color: ${({navBackground}) => navBackground ? "#000000cf" : "none"};
  font-size: ${({navBackground}) => navBackground ? ".85em" : "1em"};
  .search-bar{
    background-color: #333333;
    border-radius: 50px;
    width: 30%;
    padding: .4em 1em;
    display: flex;
    align-items: center;
    gap: .5em;
    input{
      color: #ffffff;
      border: none;
      background: none;
      outline: none;
      width: 100%;
      height: 1.7em;
      font-size: .9em;
      &::placeholder{
        color: #a0a0a0;
      }
    }
  }
  .avatar{
    background: black;
    padding: .3em 1em .3em .4em;
    border-radius: 50px;
    border: 1px solid #59f8fd;
    display: flex;
    justify-content: center;
    align-items: center;
    a{
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5em;
      text-decoration: none;
      font-weight: bold;
      svg {
        font-size: 1.3em;
        background: #282828;
        padding: .2em;
        border-radius: 50px;
        color: #c7c7c7;
      }
    }
  }
`;