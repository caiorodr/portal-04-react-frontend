import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from 'socket.io-client';
import { createContext } from 'use-context-selector';
import { useApi } from "../../hooks/useApi";
import { TokenObject } from "../../utils/tokenObject";
import { AuthContextType, AuthLogIn, AuthProviderProps, Menu, Notification, SignInUser } from "./types";


export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<SignInUser | null>(null)
  const [userError, setUserError] = useState('')
  const [socket, setSocket] = useState<Socket | null>(null);
  const [menuPrincipal, setMenuPrincipal] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const api = useApi()
  const navigate = useNavigate();
  const [notification, setNotification] = useState<Notification | null>(null)

  const tokenObject = new TokenObject(
    '@token', 
    '@token_cookie',
    '_auth_state_user'
  )

  useEffect( () => {
    const storageData = localStorage.getItem('@token:')

    const requestMenu = async () => {
      const responseMenu = await api.requestMenuPrincipal(storageData ? storageData : '')
        if(responseMenu){
          setIsLoading(false);
          setMenuPrincipal(responseMenu)
        }
    }
    
    // Utilize a variável "isAuthenticated" na lógica de autenticação
    const token = tokenObject.initialToken()

    if (token.isSignIn) {     
      if (token.userState) {
        const notificationLS = localStorage.getItem('@notification:')
        
        setUser(token.userState)
        if(notificationLS){
          setNotification(JSON.parse(notificationLS))
        }
        requestMenu()
        const createNotification = async (id: number) => {
          const resultApiNotification: any = await api.findNotification(id)
          setNewNotification(resultApiNotification)
        }
        createNotification(token.userState.idSiga)
      }
    } else {
      navigate("/login")
      setUser(null)
    }
  }, [])
      

  const signin = useCallback(
    async (data: AuthLogIn) => {
      const { login, senha } = data
      const resultApi = await api.signin(login, senha)


      if (resultApi.login && resultApi.accessToken) {

        //? NOTIFICATIONS
        const resultApiNotification: any = await api.findNotification(resultApi.idSiga)
        setNewNotification(resultApiNotification)
        console.log('result notifcation ' + resultApiNotification)
        //?

        const responseMenu =  await api.requestMenuPrincipal(resultApi.accessToken)

        if(responseMenu){
          setMenuPrincipal(responseMenu)
          setIsLoading(false);
        }
        
        setUser(resultApi)

        localStorage.setItem('@notification:', JSON.stringify(resultApiNotification) )
        localStorage.setItem('@token:', resultApi.accessToken)
        localStorage.setItem('@idSiga:', resultApi.idSiga)


        const decodedToken = jwtDecode<JwtPayload>(resultApi.accessToken);
        const expirationDate = (decodedToken.exp ?? 0) * 1000; // Converter para milissegundos
        
        tokenObject.syncTokens({ 
          authSL: {
            token: resultApi.accessToken,
            expiresAt: new Date(expirationDate)
          },
          authCookie: {
            token: resultApi.accessToken,
            expiresAt: new Date(expirationDate)
          },
          isSignIn: true,
          userState: resultApi
        });

        navigate("/home");


      } else if (resultApi.response.status === 400) {
        setUserError(resultApi.response.data[0].message)
      }
    }, [],
  )

  const  signout = useCallback(() => {
    //await api.logout();
    navigate("/login")
    setUser(null)
    localStorage.clear()
    socket?.close()
  }, [socket],)

  
  function setErrorSignInUser(message: string) {
    setUserError(message)
  }


  function setNewNotification(data: Notification) {
    setNotification(data)
  }

  function  setConnectionSocket(socket: Socket | null) {
    setSocket(socket)
  }

  return (
    <AuthContext.Provider
      value={{ user, signin, signout, userError, setErrorSignInUser, socket, notification, setNewNotification, menuPrincipal, isLoading, setConnectionSocket }}
    >
      {children}
    </AuthContext.Provider>
  )
}