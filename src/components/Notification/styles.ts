import styled from "styled-components";

export const ContainerNotification = styled.div`
  word-break: break-all;
  width: 90%;
  margin: 20px auto;
  padding: 1rem 1.25rem 1.5rem 1.25rem;
  background-color: ${props => props.theme["blue10"]};
  border: 1px solid #fff;
  border-radius: 8px;

  background-size: 100% 40%;
`;


export const NotificationMessage = styled.div`
  display: flex;
  cursor: pointer;
  gap: 1rem;

  img{
    width: 3.125rem; /* Equivalente a 50px */
    height: 3.125rem; /* Equivalente a 50px */
    border-radius: 50%;
    margin-right: 0.625rem; /* Equivalente a 10px */
  }
  
`

export const NotificationContent = styled.div`
  flex: 1;
  p:nth-child(2){
    font-weight: bold;

  };
  p:nth-child(3){
    margin-left: 0.3rem;
    margin-bottom: 0.3rem;
  };
`

export const NotificationDetails = styled.div`
  text-align: right;
  p:nth-child(1){
    font-size: 0.70rem;
    margin: -0.3rem -0.3rem 0 0;
  }
`

