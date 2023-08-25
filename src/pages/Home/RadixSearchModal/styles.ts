import * as Dialog from "@radix-ui/react-dialog";
import styled, { keyframes, createGlobalStyle }  from "styled-components";

import { AutoComplete, Avatar } from 'antd';
import { FileSearch, User, CaretLeft } from "phosphor-react";

const openModal = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const swipeUp = keyframes`
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }

  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`

const closeModal = keyframes`
  from {
    opacity: 0%;
    transform: translateX(50px);
  }

  to {
    opacity: 75%;
    transform: translateX(0px);
  }
`

const breath = keyframes`
  0%              { opacity: 60%; filter: drop-shadow(0 0 4em #ffffff);}
  25%, 50%, 75%   { opacity: 75%; filter: none}
  100%            { opacity: 60%; filter: drop-shadow(0 0 4em #ffffff);}

`;

export const Overlay = styled(Dialog.Overlay)`
  animation-name: ${openModal};
  animation-duration: 0.25s;
  animation-iteration-count: finite;

  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
`

export const RemoveDot = styled(Dialog.Close)`
  visibility: hidden;
`

export const Content = styled(Dialog.Content)`
  animation-name: ${swipeUp};
  animation-duration: 0.5s;
  
  background: rgb(0, 59, 90);
  background: linear-gradient(
    90deg,
    rgba(0, 59, 90, 1) 0%,
    rgba(0, 112, 173, 1) 58%
  );
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;

  padding: 25px;
  z-index: 999;
`

export const ContainerCenter = styled.div`

  justify-content: center;
  color: ${props => props.theme["blue60"]};

  display: grid;
  place-items: center; 

  background-color: transparent;

  img{
    height: 20vh;
    width: 30vw;
    margin-top: 3rem;
    background-color: white;
    padding: 0.5rem;
    border-radius: 15px;
    opacity: 70%;

    transform: scale(1.3);
  }
`

export const SearchBar = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  margin-top: 2rem;
`

export const GlobalStyle = createGlobalStyle`
  .ant-select-selector {
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
    border-top-right-radius: 15px !important;
    border-bottom-right-radius: 15px !important;
  }
`;

export const SearchInput = styled(AutoComplete)`
  height: 2rem;
  width: 80vw;
  font-size: 10px;
  margin-left: -1px;
  
  &::placeholder{
    font-size: 5px;
  }
`

export const CancelButton = styled.div`
  display: grid;
  place-items: center;

  visibility: visible;

  height: 2rem;
  width: 10vw;
  
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;

  background-color: white;
  opacity: 75%;

  animation-name: ${closeModal};
  animation-duration: 0.75s;
`

export const CloseLeft = styled(CaretLeft)`
visibility: visible;
color: ${props => props.theme["blue700"]};
`

export const Title = styled(Dialog.Title)`
  margin-top: 2rem;
  text-align: center;
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  max-width: 50%;

  animation-name: ${breath};
  animation-duration: 5s;
  animation-iteration-count: infinite;
`

export const UserSearch = styled(User)`
  cursor: pointer;
  margin-top: 0.3rem;
`

export const DocumentSearch = styled(FileSearch)`
  cursor: pointer;
  margin-top: 0.3rem;
`

export const AvatarAutoComplete = styled(Avatar)`
  object-fit: cover;
  width: 100%;
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

export const TabFrame = styled.iframe`
  width: 100%; 
  height: calc((100vh - 7rem));
  border: none;
`