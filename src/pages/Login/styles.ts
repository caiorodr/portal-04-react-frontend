import { Button } from "@ggps3-ds/react";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";

export const LoginContainer = styled.main`
  width: 100%;
  margin: 0 auto 0;
  padding: 0;
  overflow: hidden;
`;

export const HeaderContainer = styled.div`
  background: rgb(0, 59, 90);
  background: linear-gradient(
    90deg,
    rgba(0, 59, 90, 1) 0%,
    rgba(0, 112, 173, 1) 58%
  );
`;

export const ContentHeader = styled.div`
  display: grid;

  img {
    margin: 1rem 1rem 8rem;
    max-width: 15rem;
    object-fit: fill;

  }

  h1 {
    width: 50vh;
    font-weight: 1.6;
    font-size: 1.25rem;
    margin: 1rem 2.5rem 8rem;
    color: ${(props) => props.theme["whiteSoft"]};
  }

  @media (max-width: 1366px) {
      /* Adicione a media query para //! notebooks */
    img {
      max-width: 13rem;
      margin: 0.5rem 0.5rem 4rem;
    }

    h1 {
      width: 65vh;
      font-size: 1rem;
      margin: 0.5rem 2rem 3rem;
    }
  }

  @media (max-width: 900px) {
      /* Adicione a media query para //! tablets */
    img {
      max-width: 13rem;
      margin: 1rem 0.5rem 60vh;
    }
    h1 {
      visibility: hidden;
    }
  }

  @media (max-width: 400px) {
      /* Adicione a media query para //! mobile */
    img {
      max-width: 13rem;
      margin: 1rem 0.5rem 53vh;
    }
    h1 {
      visibility: hidden;
    }
  }

`;

export const WavesSVG = styled.svg`
  position: relative;
  width: 100%;
  height: 10vh;
  margin-bottom: -7px; /*Fix for safari gap*/
  min-height: 100px;
  max-height: 400px;
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

export const SignContainer = styled.div`
  position: fixed;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);

  background-color: #fff;
  padding: 2.5rem;
  border: 0;
  border-radius: 1.875rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  margin-right: 13rem;
  max-width: 30.2rem;
  width: 100%;
  height: 40rem;

  & img {
    margin-bottom: 1rem;
    display: flex;
    margin-left: 4.5rem;
  }

  & h1 {
    display: flex;
    justify-content: center;
    font-weight: 1.6;
    margin-bottom: 2rem;
    color: ${(props) => props.theme["gray200"]};
  }

  @media (max-width: 1366px) {
     /* Adicione a media query para //! notebooks */
    margin-right: 7.563rem;
    max-width: 26rem;
    width: 100%;
    height: 30rem;

    & img {
      width: 70%;
      margin-bottom: 0;
      margin-top: -2rem;
      margin-left: 4.5rem;
    }

    & h1{
      margin-bottom: 0.75rem;
      margin-top: -1rem;
      font-size: 1.75rem;
    }
  }

  @media (max-width: 900px) {
    /* Adicione a media query para //! tablets */
    left: 0;
    display: grid;
    max-width: 26rem;
    width: 100%;
    height: 37rem;
    margin: 0 auto; 
    margin-top: -35vh;
    transform: scale(0.90);

    & img {
      width: 100%;
      margin-top: -1rem;
      margin-bottom: 1rem;
      margin-left: 2rem;
    }

    & h1{
      margin-bottom: 3rem;
      font-size: 1.75rem;
    }
  }

  @media (max-width: 400px) {
    /* Adicione a media query para //! mobile */
    left: 0;
    display: grid;
    place-items: center;
    max-width: 26rem;
    width: 100%;
    height: 30rem;
    margin: 0 auto; 
    margin-top: -35vh;
    transform: scale(0.90);

    & img {
      width: 70%;
      margin-bottom: 0;
      margin-top: -2rem;
      margin-left: 4.5rem;
    }

    & h1{
      margin-bottom: 0.75rem;
      margin-top: -1rem;
      font-size: 1.75rem;
    }
  }
`;

export const ButtonEnter = styled(Button)`
  margin-top: 1.5rem;
  width: 100%;
`;

export const LinkHome = styled(NavLink)`
  background-color: red;
`;
