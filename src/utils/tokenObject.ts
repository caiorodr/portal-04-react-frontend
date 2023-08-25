import Cookies from 'js-cookie';

export class TokenObject {
  private readonly authStorageName: string
  private readonly stateStorageName: string
  private readonly authTimeStorageName: string
  private readonly authTimeCookieName: string
  private readonly authCookieName: string
  private readonly authUserState: string
  private readonly signinName: string

  constructor(
    authStorageName: string,
    authCookieName: string,
    userState: string
  ) {
    this.authStorageName = authStorageName
    this.authTimeStorageName = `${authStorageName}_time`
    this.authTimeCookieName = `${authCookieName}_time`
    this.stateStorageName = `${authStorageName}_state`
    this.authCookieName = authCookieName,
    this.authUserState = userState
    this.signinName = `${authStorageName}_signin`
  }



 initialToken(): Auth.AuthStateInterface {
    const authTokenLS = localStorage.getItem(this.authStorageName)
    const authTokenTime = localStorage.getItem(this.authTimeStorageName)
    const authTokenCookie = Cookies.get(this.authCookieName)
    const authUserState = Cookies.get(this.authUserState)

    return this.checkTokenExist(
      authTokenLS,
      authTokenTime,
      authTokenCookie,
      authUserState
    );
  }


  checkTokenExist(
    authTokenLS: string | null | undefined,
    authTokenTime: string | null | undefined,
    authTokenCookie: string | null | undefined,
    authUserState: string | null | undefined,
  ): Auth.AuthStateInterface {
    if (!!authTokenLS && !!authTokenTime && !!authTokenCookie && !!authUserState) {
      const expiresAt = new Date(authTokenTime);

      try {
        const authState = JSON.parse(authUserState);
          return {
            authSL: {
              token: authTokenLS,
              expiresAt: expiresAt,
            },
            authCookie: {
              token: authTokenCookie,
              expiresAt: expiresAt,
            },
            userState: authState,
            isSignIn: true
          }

      } catch (e) {
        return {
          authSL: null,
          authCookie: null,
          userState: null,
          isSignIn: false,
        };
      }
    } else {
      return {
        authSL: null,
        authCookie: null,
        userState: null,
        isSignIn: false,
      };
    }
  }



  /*
   Utilizado para a percistencia de dados ao usuario da tela principal ou apertar F5.
  */ 

  syncTokens(authState: Auth.AuthStateInterface): void {
    if (authState.authSL || authState.authCookie) {
      this.setToken(
          authState.authSL!.token,
          authState.authSL!.expiresAt,
          authState.authCookie!.token,
          authState.authCookie!.expiresAt,
          authState.userState,
          authState.isSignIn
      );
    
    } else {
      this.removeToken();
    }
  }


  setToken(
    authTokenSL: string,
    expiresAtSL: Date,
    authTokenCookie: string,
    expiresAtCookie: Date,
    authState: Auth.AuthStateUserObject | null,
    isSignIn: boolean
  ): void {

    localStorage.setItem(this.authStorageName, authTokenSL);
    localStorage.setItem(this.authTimeStorageName, expiresAtSL.toISOString());
    localStorage.setItem(this.authUserState, JSON.stringify(authState));
    localStorage.setItem(this.signinName, JSON.stringify(isSignIn));
   

    Cookies.set(this.authCookieName, authTokenCookie, {
      expires: expiresAtCookie,
    });

    Cookies.set(this.authTimeCookieName, expiresAtCookie.toISOString(), {
      expires: expiresAtCookie,
    });

    Cookies.set(this.authUserState, JSON.stringify(authState), {
      expires: expiresAtCookie,
    });
    
  }




  removeToken(): void {
    localStorage.removeItem(this.authStorageName);
    localStorage.removeItem(this.authTimeStorageName);
    localStorage.removeItem(this.stateStorageName);
    
    Cookies.remove(this.authStorageName);
    Cookies.remove(this.authTimeStorageName);
    Cookies.remove(this.stateStorageName);    
  }


} 