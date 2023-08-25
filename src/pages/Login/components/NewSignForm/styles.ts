import styled from "styled-components";
export const FormContainer = styled.div``;


export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  label {
    display: flex;
    font-size: 0.85rem;
    font-weight: 1.6;
    color: ${(props) => props.theme["gray600"]};
    margin-bottom: -20px;
  }

  span {
    margin-top: -15px;
    font-size: 0.85rem;
    color: ${(props) => props.theme["redDark"]};
    margin-top: -2rem;
  }

  @media (max-width: 1366px) {
    /* Adicione a media query para notebooks */
    /* :nth-child(4) {
      margin-bottom: 1rem;
    } */

    span {
      margin-bottom: -1rem;
    }
  }
`;

export const ForgotPassword = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


export const ButtonFormModal = styled.button`
  border: 0;
  color: ${props => props.theme["blue700"]};
  border-bottom: 0.063rem solid ${props => props.theme["blue700"]};

  background-color: transparent;

  cursor: pointer;
  font-size: 0.875rem;
`