import styled from "styled-components";

export const NotificationContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 1.25rem;
  background-color: ${props => props.theme["white"]};
  border: 1px solid ${props => props.theme["white"]};

  background-size: 100% 40%;
  background-repeat: no-repeat;

  overflow-y: scroll;
  height: 100vh;
`;