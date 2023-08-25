import styled from "styled-components";

interface ContainerSpinProps {
   variant?: string;
 }

export const ContainerSpin = styled.div<ContainerSpinProps>`
   margin-top: ${props => props.variant};
   text-align: center;
`