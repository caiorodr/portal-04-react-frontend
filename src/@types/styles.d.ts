import "styled-components";
import { defaultTheme } from "../styles/themes/default";

type ThemeType = typeof defaultTheme;

/* Toda vez que for importado o styles-components, podemos ver a tipagem dos estilos, a definição de tipos é o que foi
    definido no styled-components, por isso usamos o import styled-components
    e declaramos ele a baixo para subscrever alguma coisa. */
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeType {}
}
