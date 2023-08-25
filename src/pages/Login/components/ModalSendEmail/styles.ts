import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

import { Button } from "@ggps3-ds/react";



export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
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
    text-align: center;
    color: ${(props) => props.theme["gray600"]};
  }

  small{
    font-size: 12.5px;
  }

  @media (max-width: 1366px) {
    /* Adicione a media query para //! notebooks */
    width: 25vw;

    img{
      height: 30vh;
      margin-top: -2rem;
      margin-left: 18%;
      display: block; 
    }
  }

  @media (max-width: 1440px) {
    /* Adicione a media query para //! segunda tela */
    img{
      margin-top: -1.5rem;
      margin-left: 22%;
      display: block; 
    }
  }

  @media (max-width: 900px) {
    /* Adicione a media query para //! tablet */
    width: 90vw;

    img{
      height: 15vh;
      margin-top: -2rem;
      margin-left: 28%;
      display: block; 
    }
  }

  @media (max-width: 400px) {
    /* Adicione a media query para //! mobile */
    width: 90vw;

    img{
      height: 15vh;
      margin-top: -2rem;
      margin-left: 30%;
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
    margin-top: 0.5rem;
    margin-bottom: -0.5rem;
    font-size: 25px;
  }

  @media (max-width: 1440px) {
    /* Adicione a media query para segunda tela */
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 30px;
  }
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


export const ButtonResendEmail = styled(Button)`
  margin-top: 1.5rem;
  width: 100%;
  color: ${(props) => props.theme["blue500"]}
`;
