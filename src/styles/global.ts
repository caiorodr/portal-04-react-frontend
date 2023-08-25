import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: transparent;
  }

  body {
    background-color: ${(props) => props.theme["white-hard"]};
    color: ${(props) => props.theme["gray-900"]};
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }


  body, input, textarea, button, p {
    font-family: "Manrope", sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6 { 
    font-family: "Poppins", sans-serif;
  }

  .p-tabview .p-tabview-panels{
    padding: 0;
  }
  .ant-tabs-nav{
    margin: 0 !important;
  }
  .ant-menu.ant-menu-root.ant-menu-inline.ant-menu-light{
    border: none !important;
  }


::-webkit-scrollbar
{
	width: 6px;
}

::-webkit-scrollbar-thumb
{
	
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #4b96de;
}

::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	
	background-color: white;
}


.ant-radio-button-wrapper.ant-radio-button-wrapper-checked {
        background: ${(props) => props.theme["blue300"]}!important; 
        border-color: ${(props) => props.theme["blue300"]}!important; 
}

.ant-select-selection-placeholder {
  color: ${(props) => props.theme["blue300"]} !important; 
}

`;
