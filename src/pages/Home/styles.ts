import { AutoComplete, Avatar, Menu, Skeleton } from 'antd';
import { Bell, FileSearch, MagnifyingGlass, User, UserGear, UsersThree } from "phosphor-react";
import styled, { keyframes } from 'styled-components';

import { Button } from "@ggps3-ds/react";


export const Main = styled.main`
  height: 100vh;

  @media (max-width: 900px) {
    overflow: hidden;
  }
`

//TOP BAR:



export const Header = styled.header`
  background-color: ${props => props.theme["blue200"]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.75rem;
`

export const ContainerLeft = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 1rem;

  gap: 3rem;
  
  button {
    background: transparent;
    border: none;
    color: ${props => props.theme["white"]};
    cursor: pointer;
  }

  img {
    width: 09rem;
    margin-top: -6px;
  }
`
export const SideButton = styled.button`
  background: transparent;
  border: none;
  margin-top: 1.1rem;
  color: ${props => props.theme["white"]};
  cursor: pointer;
`

export const SearchInput = styled(AutoComplete)`
  border: none;
  border-radius: 0.2rem;
  height: 50%;
  
  width: 20rem;
  font-size: 10px;
  outline: none;

  &::placeholder{
    font-size: 5px;
  }

  @media (max-width: 900px) {
    height: 2rem;
    width: 90vw;
    font-size: 10px;

    margin-top: 1rem;
    
    &::placeholder{
      font-size: 5px;
    }
  }
`

export const Sino = styled(Bell)`
  cursor: pointer;
  color: ${props => props.theme["blue60"]};
`
export const GpsAmigo = styled(UsersThree)`
  cursor: pointer;
  color: ${props => props.theme["blue60"]};
`
export const KeyUser = styled(UserGear)`
  cursor: pointer;
  color: ${props => props.theme["blue60"]};
`

export const IconsBar = styled.div`
  display: flex;
  gap: 1rem;
`


export const ContainerCenter = styled.div`
display: flex;
align-items: center;
gap: 0.25rem;
color: ${props => props.theme["blue60"]};

background-color: transparent;

  @media (max-width: 900px) {
    display: none;
  }
`
export const ContainerRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  color: ${props => props.theme["blue60"]};

  background-color: transparent;
  
  @media (max-width: 900px) {
    display: none;
  }
`

export const AvatarAutoComplete = styled(Avatar)`
  object-fit: cover;
  width: 100%;
`

export const AvatarPortalCard = styled(Avatar)`
  display: inline-block;
  background-color: ${props => props.theme["blue400"]};
  
  border: none;
  color: ${props => props.theme["white"]};
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  width: 3.125rem;
  height: 3.125rem;


  box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.59);
  -webkit-box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.59);
  -moz-box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.59);

  @media (max-width: 900px) {
    transform: scale(1.50);
    margin-left: 0rem;
  }
`

export const AvatarPortal = styled(Avatar)`
  display: inline-block;
  background-color: ${props => props.theme["blue400"]};
  
  border: none;
  color: ${props => props.theme["white"]};
  margin-left: 1.5rem;
  width: 3.125rem;
  height: 3.125rem;


  box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.59);
  -webkit-box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.59);
  -moz-box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.59);

  @media (max-width: 900px) {
    transform: scale(0.65);
    margin-left: 0rem;
  }

`

export const PhotoAndName = styled.div`
  margin-top: -1px;
  
  li{
    display: inline-block;
    margin: 0.5rem;
    font-size: 14px;
    font-weight: 400;
    color: ${props => props.theme["white"]};
  }
  
`


export const PhotoColaborator = styled.li`
  display: inline-block;
`


export const NameColaborator = styled.li`
  display: inline-block;
  margin: 1rem;
  font-weight: bold;
  font-size: 14px;
  color: ${props => props.theme["white"]};
`

//Toastify:

export const ContentToastify = styled.div`
display: flex; 
gap: 0.7rem;
`
export const ContentTextToatify = styled.div`
margin-top: -0.3rem;
`

export const AvatarToastify = styled(Avatar)`
background-color: ${props => props.theme["blue400"]};
width: 3.5rem;
height: 3.5rem;

`
export const TitleToastify = styled.h4`
  font-size: 0.95rem;
`
export const DescriToastify = styled.p`
  margin-bottom: 0.2rem;
  font-weight: bold;
  font-size: 0.9rem;
`
export const TextToastify = styled.p`
  font-size: 0.7rem;
`






//Side Bar:


export const MenuTabs = styled(Menu)`
  width: 100%;
  overflow-y: auto;
`

export const Container = styled.div`
  display: flex;
  background: ${props => props.theme["blue10"]};  
`

export const SideBar = styled.div`
  width: 25rem;
  height: calc((100vh - 4rem));

  @media (max-width: 900px) {
    height: calc((100vh - 8rem));
  }
`

export const SkeletonLoad = styled(Skeleton)`
  ant-skeleton-title{
    width: 20rem;
  }

  background-color: white;
  padding: 2rem;
`

export const ContentTabs = styled.div`
  padding: 10px 0 0 10px;
  width: 100%;
  background: ${props => props.theme["blue10"]};
  
`

export const TabFrame = styled.iframe`
  width: 100%; 
  height: calc((100vh - 7rem));
  border: none;

  @media (max-width: 900px) {
    height: calc((100vh - 11rem));
  }  
`
export const ContentLabelSelect = styled.div`
  width: 83%; 
  
  
  h3 {
    font-weight: 700;
    overflow: hidden; 
    text-overflow: ellipsis;
     white-space: nowrap;
    margin: 0;
  }

  :nth-child(2) {
    font-weight: 600;
  }
`

export const Buscar = styled(MagnifyingGlass)`
  cursor: pointer;
  color: ${props => props.theme["blue60"]};
`

export const DocumentSearch = styled(FileSearch)`
  cursor: pointer;
  margin-top: 0.3rem;
`

export const UserSearch = styled(User)`
  cursor: pointer;
  margin-top: 0.3rem;
`


// Responsive styles

const opacityOn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const TextBreath = keyframes`
  0%              { opacity: 70%; filter: drop-shadow(0 0 3em #ffffff);}
  25%, 50%, 75%   { opacity: 90%; filter: none}
  100%            { opacity: 70%; filter: drop-shadow(0 0 3em #ffffff);}

`;

const AvatarBreath = keyframes`
  0%              { filter: drop-shadow(0 0 0.5em #ffffff75);}
  25%, 50%, 75%   { filter: none}
  100%            { filter: drop-shadow(0 0 0.5em #ffffff75);}

`;

export const ResponsiveMode = styled.div`
 display: none;
  @media (max-width: 900px) {
    display: flex;
    bottom: 0;
    z-index: 999; 
  }
`

export const MobileBar = styled.div`
  position: fixed;
  justify-content: space-evenly;
  align-items: center;
    
  bottom: 0;
  height: 4rem;
  width: 100%;
  z-index: 999;

  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  background-color: ${props => props.theme["blue200"]};
  
`

export const Overlay = styled.div`
  animation-name: ${opacityOn};
  transition-property: all;
  animation-duration: 0.25s;

  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 800;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
`

export const MobileCard = styled.div`
  overflow-y: hidden;
  transition-property: all;
  transition-duration: 0.25s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    &.close {
      max-height: 0;
    }

  position: fixed; 
  bottom: 0;  
  width: 100vw;
  z-index: 900;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: ${props => props.theme["blue200"]};
`

export const CloseButton = styled(Button)`
  position: absolute;
  background: transparent !important;
  border: 0;
  visibility: visible;
 
  top: 1rem;
  right: 1rem;
  line-height: 0;
  cursor: pointer;
  color: ${props => props.theme["white"]};
`

export const SearchContent = styled.div`
  animation-name: ${opacityOn};
  animation-duration: 0.5s;

  display: grid;
  place-items: center;
  align-content: start;
  height: 100%;

  margin-top: 13vh;
`

export const Text = styled.h1`
  margin-top: 2rem;
  text-align: center;
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  max-width: 50%;

  animation-name: ${TextBreath};
  animation-duration: 5s;
  animation-iteration-count: infinite;
`

export const UserContent = styled.div`
  animation-name: ${opacityOn};
  animation-duration: 0.5s;

  display: grid;
  place-items: center;
  align-content: start;
  height: 100%;

  margin-top: 13vh;
`

export const ContentGroup = styled.div`
  display: inline-block;
`

export const CardUserHeader = styled.div`
  display: grid;
  place-items: center; 
`

export const AvatarCard = styled(Avatar)`
  display: inline-block;
  background-color: ${props => props.theme["blue400"]};
  
  border: none;

  color: ${props => props.theme["white"]};
  width: 3.125rem;
  height: 3.125rem;

  margin-top: 1rem;
  margin-bottom: 2.5rem;

  justify-content: center;


  box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.59);
  -webkit-box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.59);
  -moz-box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.59);

  @media (max-width: 900px) {
    transform: scale(2.3) !important;

    border: 1px solid;
    border-color: white;

    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;

    opacity: 100% !important;

    animation-name: ${AvatarBreath};
    animation-duration: 5s;
    animation-iteration-count: infinite;
  }
`

export const NameColaboratorCard = styled.li`
  display: inline-block;
  margin: 1rem;
  font-weight: bold;
  font-size: 15px;
  color: ${props => props.theme["white"]};
`

export const CardUserBody = styled.div`
  display:grid;
  place-items: center;
`

export const CardButton = styled.div`
  border-radius: 1.875rem;
  background-color: white;
  
    
  display: flex;
  
  align-items: center;
    
  width: 90%;
  height: 2rem;
    
  margin-bottom: 0.7rem;

  cursor: pointer;
`

export const LogOut = styled.div`
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme["redDark"]};

  display:flex;
  justify-content: center;
  align-items: center;

  width: 5rem;
  height: 2rem;

  margin-top: 1rem;
`