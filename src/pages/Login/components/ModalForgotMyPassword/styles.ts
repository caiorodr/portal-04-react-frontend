import * as Dialog from "@radix-ui/react-dialog";
import styled, { keyframes }  from "styled-components";

import { Button, TextInput } from "@ggps3-ds/react";


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

export const Content = styled(Dialog.Content)`
  animation-name: ${openModal};
  animation-duration: 0.5s;
  animation-iteration-count: finite;
  
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 45rem;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  label{
    font-size: 1rem;
    font-weight: 1.6;
    color: ${(props) => props.theme["gray600"]};
  }

  img{
    margin-left: 20%;
  }

  p{
    margin-top: 10px;
    margin-bottom: 30px;
    text-align: center;
    color: ${(props) => props.theme["gray600"]};
  }

  span {
    font-size: 0.85rem;
    color: ${(props) => props.theme["redDark"]};
    margin-top: -15px;
  }

  @media (max-width: 1366px) {
    /* Adicione a media query para notebooks */
     /* Adicione a media query para //! notebooks */
     width: 25vw;

    img{
      height: 30vh;
      margin-top: -2.5rem;
      margin-left: 20%;
      display: block; 
    }
  }

  @media (max-width: 1440px) {
    /* Adicione a media query para //! segunda tela */
    img{
      margin-top: -2.5rem;
      margin-left: 15%;
      display: block; 
    }
  }


  @media (max-width: 900px) {
    /* Adicione a media query para //! tablet */
    width: 90vw;
    
    img{
      height: 20vh;
      margin-top: -2.5rem;
      margin-left: 23%;
      display: block; 
    }
  }

  @media (max-width: 400px) {
    /* Adicione a media query para //! mobile */
    width: 90vw;

    img{
      height: 27vh;
      margin-top: -2.5rem;
      margin-left: 20%;
      display: block;
    }
  }
`

export const Title = styled(Dialog.Title)`
  margin: 0;
  text-align: center;

  color: #222227;
  font-size: 30px;
  font-weight: bold;

  @media (max-width: 1366px) {
    /* Adicione a media query para //! notebooks */
    margin-top: -1.5rem;
    margin-bottom: -0.5rem;
    font-size: 25px;
  }

  @media (max-width: 1440px) {
    /* Adicione a media query para segunda tela */
    margin-top: -2.5rem;
    margin-bottom: 0.5rem;
    font-size: 30px;
  }
`

export const SendInput = styled(TextInput)`
  border: 0 none;
  outline: 0;
`

export const SendButton = styled(Button)`
  margin-top: 1.5rem;
  width: 100%;
`

export const CancelButton = styled(Button)`
  position: absolute;
  background: transparent !important;
  border: 0;
  margin: -20px;
  
  top: 1.5rem;
  right: 0.9rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme["gray900"]};
`

