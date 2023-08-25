import * as Dialog from "@radix-ui/react-dialog";
import styled, { keyframes }  from "styled-components";

import { Avatar } from 'antd';

import { Button } from "@ggps3-ds/react";

const openModal = keyframes`
 0%     { opacity: 0}
 100%   { opacity: 1}
` 

export const Overlay = styled(Dialog.Overlay)`
  animation-name: ${openModal};
  animation-duration: 0.25s;
  animation-iteration-count: finite;

  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;

export const RemoveDot = styled(Dialog.Close)`
  visibility: hidden;
`;

export const Content = styled(Dialog.Content)`
  animation-name: ${openModal};
  animation-duration: 0.5s;
  animation-iteration-count: finite;

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
  z-index: 999;
  padding: 25px;
  
  display: grid;
  place-items: center;  
  align-content: center;
`

export const CancelButton = styled(Button)`
  position: absolute;
  background: transparent !important;
  border: 0;
  margin: -20px;
  visibility: visible;
  
  top: 1.5rem;
  right: 0.9rem;
  line-height: 0;
  cursor: pointer;
  color: ${props => props.theme["white"]};
`

export const CardGroup = styled.div`
`

export const ModalHeader = styled.div`
  display: grid;
  place-items: center; 
`
export const AvatarPortal = styled(Avatar)`
  display: inline-block;
  background-color: ${props => props.theme["blue400"]};
  
  border: none;

  color: ${props => props.theme["white"]};
  width: 3.125rem;
  height: 3.125rem;

  margin-top: 2.5rem;
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
  }
`

export const NameColaborator = styled.li`
  display: inline-block;
  margin: 1rem;
  font-weight: bold;
  font-size: 15px;
  color: ${props => props.theme["white"]};
`

export const ModalBody = styled.div`
  display:grid;
  place-items: center;
`

export const ModalButton = styled.div`
  border-radius: 1.875rem;
  background-color: white;
  
    
  display: flex;
  
  align-items: center;
    
  width: 89%;
  height: 2rem;
    
  margin-bottom: 0.7rem;

  cursor: pointer;
`

export const CloseButton = styled.div`
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme["redDark"]};

  display:flex;
  justify-content: center;
  align-items: center;

  width: 5rem;
  height: 2rem;
`

export const WavesSVG = styled.svg`
  position: relative;
  display: flex;
  
  margin-bottom: 0px; /*Fix for safari gap*/
  margin-right: 0.1%;

  height: 10vh;
  min-height: 100px;
  max-height: 400px;
  
  width: 104.7%;

  @media (max-width: 400px) {
    width: 110%;
    margin-right: 0%;
  }
`;

const moveForever = keyframes`
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
`;

export const ParallaxGroup = styled.g`
  /* Estilos para o grupo g com a classe "parallax" */

  /* Animation */
  > use {
    animation: ${moveForever} 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  }

  > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 8s;
  }

  > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 11s;
  }

  > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 14s;
  }

  > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 21s;
  }
`;

export const WaveFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-Color: white;

  margin-top: -5px;
  margin-bottom: -1rem;

  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  
  height: 25vh;
  width: 105%;

  @media (max-width: 400px) {
    width: 110.08152%;
  }
`

export const TabFrame = styled.iframe`
  width: 100%; 
  height: calc((100vh - 7rem));
  border: none;

  @media (max-width: 900px) {
    height: calc((100vh - 11rem));
  }  
`